import { Component, OnInit,ElementRef } from '@angular/core';
import { UploadService } from './upload.service';
import { FormGroup, FormControl, Validators,FormArray} from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

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
    this.uploadFilesTransformado=[];
    this.uploadFiles = [];
    this.myInputVariable.nativeElement.value = "";
  }


  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.uploadFiles.push(event.target.files[i]);
    }
  }

  public enviarupload(){
    for (var i = 0; i < this.uploadFiles.length; i++) {
      this.lerArquivoETransformar(this.uploadFiles[i]).subscribe(valor=>{
        console.log(valor.fileName);
        console.log(valor.xmlDoc);
        this.montarArquivoNovo(valor.xmlDoc,valor.fileName);  
        this.prepararEEnviarArquivo();
      });
    }
    
    
  }

  public lerArquivoETransformar(arquivo: any){


    return new Observable<any>(obs => {

    let file: any ;
    
      file = arquivo ; 

      let fileReader: FileReader = new FileReader();
      fileReader.onload = (e) => {
        
        let texto = fileReader.result.toString();
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(texto,"text/xml");

        let agente = xmlDoc.getElementsByTagName("agente");
        
        for (var i = 0; i < agente.length; i++) {
            let regiao = agente[i].getElementsByTagName("regiao");
            for (var t = 0; t < regiao.length; t++) {
                let precoMedio = regiao[t].getElementsByTagName("precoMedio")[0];
                let newNode= xmlDoc.createElement("precoMedio");

                let valores = precoMedio.getElementsByTagName("valor");
                for (var z = 0; z < valores.length; z++) {
                  let newNodeValor= xmlDoc.createElement("valor");
                  let newTextValor = xmlDoc.createTextNode("0");
                  newNodeValor.appendChild(newTextValor);
                  precoMedio.replaceChild(newNodeValor,valores[z]);
                }

            }
        }
        
        obs.next({fileName: file.name, xmlDoc: xmlDoc} );

      }
      fileReader.readAsText(file); 
    

    });

  }


  public prepararEEnviarArquivo(){

    let formData = new FormData();
    for (var i = 0; i < this.uploadFilesTransformado.length; i++) {
        formData.append('files', this.uploadFilesTransformado[i]);
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


  public montarArquivoNovo(xmlDoc,nomefile){

    let xmlString = new XMLSerializer().serializeToString(xmlDoc);
 
    let fileNew = new File([xmlString], nomefile , {type: "text/xml"});
    let fileEnviar:any = fileNew;
    this.uploadFilesTransformado= [];
    this.uploadFilesTransformado.push(fileEnviar);
  }

}
