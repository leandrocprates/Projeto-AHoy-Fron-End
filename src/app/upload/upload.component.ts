import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  enviandoArquivo: boolean = false ; 
  myForm : FormGroup ;

  constructor(private uploadService : UploadService) { }


  ngOnInit(): void {
    this.limparForm();
  }

  limparForm(){
    this.myForm = new FormGroup({
      file: new FormControl('',)
    });
  
  }


  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        file: file
      });
    }
  }

  public enviarupload(){

    let formData = new FormData();
    formData.append('file', this.myForm.get('file').value);

    this.enviandoArquivo = true ; 
    this.uploadService.enviarupload(formData).subscribe( resposta => {
      console.log('Upload Realizado com Sucesso'); 
      this.enviandoArquivo = false ; 
      formData = null;
    }, (error)=> {
      console.log('Erro upload de arquivo');
      this.enviandoArquivo = false ; 
    });
  }


}
