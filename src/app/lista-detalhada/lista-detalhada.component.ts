import { Component, OnInit } from '@angular/core';



export interface PeriodicElement {
  sigla: string;
  tipo: string;
  total: number;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {tipo: 'Compra', sigla: 'NE', total: 1.0079},
  {tipo: 'Premio', sigla: 'NE', total: 4.0026}
  
  
];



@Component({
  selector: 'app-lista-detalhada',
  templateUrl: './lista-detalhada.component.html',
  styleUrls: ['./lista-detalhada.component.css']
})
export class ListaDetalhadaComponent implements OnInit {

  displayedColumns: string[] = ['tipo', 'sigla', 'total'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
