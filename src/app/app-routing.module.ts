import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaDetalhadaComponent } from './lista-detalhada/lista-detalhada.component';
import { UploadComponent } from './upload/upload.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path:'lista-detalhada' ,component: ListaDetalhadaComponent }, 
  { path:'upload' ,component: UploadComponent }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
