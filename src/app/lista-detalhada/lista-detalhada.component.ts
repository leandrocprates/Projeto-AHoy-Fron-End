import { Component, OnInit } from '@angular/core';
import { ListaDetalhadaService } from './lista-detalhada.service';



export interface PeriodicElement {
  sigla: string;
  tipo: string;
  total: number;
}


@Component({
  selector: 'app-lista-detalhada',
  templateUrl: './lista-detalhada.component.html',
  styleUrls: ['./lista-detalhada.component.css']
})
export class ListaDetalhadaComponent implements OnInit {

  displayedColumns: string[] = ['tipo', 'sigla', 'total'];
  dataSource = null;
  siglaDigitada:string;

  constructor(private listaDetalhadaService :ListaDetalhadaService) { }

  ngOnInit(): void {
  }

  public buscarDadosConsolidados(){
    this.listaDetalhadaService.buscarDadosconsolidados(this.siglaDigitada).subscribe( resposta=>{
        console.log('Sucesso ao buscad dados');
        console.log(resposta);
        this.dataSource = resposta as (PeriodicElement[] ) ;
      }, (error)=>{
        console.log('Erro buscar dados consolidados');
      }); 

  }



}
