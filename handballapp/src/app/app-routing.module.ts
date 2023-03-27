import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgregarJugadorComponent } from './componentes/agregar-jugador/agregar-jugador.component';
import { EditarJugadorComponent } from './componentes/editar-jugador/editar-jugador.component';
import { ListarJugadorComponent } from './componentes/listar-jugador/listar-jugador.component';
import { StatelistComponent } from './componentes/statelist/statelist.component';
import { PicklistComponent } from './componentes/picklist/picklist.component';
import { PartidoComponent } from './componentes/partido/partido.component';
import { CalendariopartidosComponent } from './componentes/calendariopartidos/calendariopartidos.component';
import { ListacategoriasComponent } from './componentes/listacategorias/listacategorias.component';
import { EditarcategoriaComponent } from './componentes/editarcategoria/editarcategoria.component';

const routes: Routes = [
  {path: '', redirectTo: 'statelist/todos', pathMatch: 'full' },
  {path: 'agregar-jugador', component:AgregarJugadorComponent},
  {path: 'listar-jugador/:cat', component:ListarJugadorComponent},
  {path: 'editar-jugador/:id', component:EditarJugadorComponent},
  {path: 'statelist/:cat', component:StatelistComponent},
  {path: 'picklist/:cat', component:PicklistComponent},
  {path: 'partido', component:PartidoComponent},
  {path: 'calendariopartidos', component:CalendariopartidosComponent},
  {path: 'listacategorias', component: ListacategoriasComponent},
  {path: 'editarcategoria/:id', component: EditarcategoriaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
