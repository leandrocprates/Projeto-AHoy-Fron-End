import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListaDetalhadaService {


  uploadURL = "http://localhost:8080/buscadaconsolidadossigla" ; 

  constructor(private http: HttpClient) { }


  public buscarDadosconsolidados(sigla: string){
    let params = new HttpParams();
    params = params.set('sigla' , sigla);
    return this.http.get(this.uploadURL, { params } ); 
  }

}
