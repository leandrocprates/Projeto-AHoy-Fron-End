import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  uploadURL = "http://localhost:8080/uploadarquivo" ; 

  constructor(private http: HttpClient) { }

  public enviarupload(formData : FormData ){
    return this.http.post(this.uploadURL , formData);
  }

}
