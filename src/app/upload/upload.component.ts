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
  @ViewChild('myInput')
  myInputVariable: ElementRef;  

  constructor(private uploadService : UploadService) { }


  ngOnInit(): void {
    this.limparForm();
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


}
