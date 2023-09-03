import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private uploadService : UploadService) { }

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }


  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  public enviarupload(){

    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource').value);

    this.uploadService.enviarupload(formData).subscribe( resposta => {
      console.log('Upload Realizado com Sucesso'); 
    }, (error)=> {
      console.log('Erro upload de arquivo');
    });
  }


}
