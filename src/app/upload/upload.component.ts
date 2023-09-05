import { Component, OnInit,ElementRef } from '@angular/core';
import { UploadService } from './upload.service';
import { FormGroup, FormControl, Validators,FormArray} from '@angular/forms';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  enviandoArquivo: boolean = false ; 
  myForm : FormGroup ;
  uploadFiles: string[] = [];
  uploadFilesTransformado: string[] = [];
  @ViewChild('myInput')
  myInputVariable: ElementRef;  

  constructor(private uploadService : UploadService) { }


  ngOnInit(): void {
  }

  limparForm(){
    this.uploadFiles = [];
    this.myInputVariable.nativeElement.value = "";
  }


  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.uploadFiles.push(event.target.files[i]);
    }
  }

  public enviarupload(){
    this.lerArquivoETransformar(this.uploadFiles);
    
  }

  public lerArquivoETransformar(uploadFiles: string[]){

    let file ;
    for (var i = 0; i < this.uploadFiles.length; i++) {
      file = this.uploadFiles[i] ; 

      let fileReader: FileReader = new FileReader();
      fileReader.onload = (e) => {
        
        let texto = fileReader.result.toString();
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(texto,"text/xml");

        let agente = xmlDoc.getElementsByTagName("agente");
        
        for (var i = 0; i < agente.length; i++) {
            let regiao = agente[i].getElementsByTagName("regiao");
            console.log(regiao);
            for (var t = 0; t < regiao.length; t++) {
                let precoMedio = regiao[t].getElementsByTagName("precoMedio")[0];
                console.log(precoMedio);
                let newNode= xmlDoc.createElement("precoMedio");
                //regiao[t].replaceChild(newNode,precoMedio);

                let valores = precoMedio.getElementsByTagName("valor");
                for (var z = 0; z < valores.length; z++) {
                  console.log(valores[z]);
                  let newNodeValor= xmlDoc.createElement("valor");
                  let newTextValor = xmlDoc.createTextNode("0");
                  newNodeValor.appendChild(newTextValor);
                  precoMedio.replaceChild(newNodeValor,valores[z]);
                }

            }
        }
        
        console.log(xmlDoc);
        this.montarArquivoNovo(xmlDoc,file);  
        this.prepararEEnviarArquivo();
        
      }
      fileReader.readAsText(file); 
    }

  }


  public prepararEEnviarArquivo(){

    let formData = new FormData();
    for (var i = 0; i < this.uploadFiles.length; i++) {
        formData.append('files', this.uploadFiles[i]);
    }

    this.enviandoArquivo = true ; 
    
    this.uploadService.enviarmultiplosupload(formData).subscribe( resposta => {
      console.log('Upload Realizado com Sucesso'); 
      this.enviandoArquivo = false ; 
      formData = null;
      this.limparForm();
    }, (error)=> {
      console.log('Erro upload de arquivo');
      this.enviandoArquivo = false ; 
    });
  }


  public montarArquivoNovo(xmlDoc,file){

    let xmlString = new XMLSerializer().serializeToString(xmlDoc);
 
    var fileNew = new File([xmlString], file.name , {type: "text/xml"});
    file = fileNew;
    this.uploadFiles = [];
    this.uploadFiles.push(file);
  }

}
