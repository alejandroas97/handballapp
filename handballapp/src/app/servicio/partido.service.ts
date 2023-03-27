import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { jugador } from './jugador';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {
  API: string ='http://localhost/app/';

  constructor(private clienteHttp:HttpClient) { }

  ObtenerJugadoresPartido():Observable<any>{
    return this.clienteHttp.get(this.API+'jugadorespartido.php');
  }

  ObtenerPartidos():Observable<any>{
    return this.clienteHttp.get(this.API+'partido.php');
  }

  InsertarPartidos(DatosJugador:any):Observable<any>{
    return this.clienteHttp.post(this.API+'insertarpartido.php'+"?partido=1",DatosJugador);
  }

  ObtenerCategorias():Observable<any>{
    return this.clienteHttp.get(this.API+'obtenercategorias.php');
  }

  ObtenerPartidosCalendario():Observable<any>{
    return this.clienteHttp.get(this.API+'partidocalendario.php');
  }

  InsertarGol(DatosJugador:any):Observable<any>{
    return this.clienteHttp.post(this.API+'insertargol.php'+"?partido=1",DatosJugador);
  }

  InsertarInfraccion(DatosJugador:any):Observable<any>{
    return this.clienteHttp.post(this.API+'insertarinfraccion.php'+"?partido=1",DatosJugador);
  }

  InsertarError(DatosJugador:any):Observable<any>{
    return this.clienteHttp.post(this.API+'insertarerror.php'+"?partido=1",DatosJugador);
  }

  EliminarJugadoresEstadistica():Observable<any>{
    return this.clienteHttp.get(this.API+'eliminarestadistica.php');
  }

  BorrarCategoria(cod:any):Observable<any>{
    return this.clienteHttp.get(this.API+'eliminarcategoria.php'+"?borrar="+cod);
  }

  EditarHoraCategoria(cat:any,Datos:any):Observable<any>{
    return this.clienteHttp.post(this.API+'editarhorario.php'+"?editar="+cat,Datos);
  }
}
