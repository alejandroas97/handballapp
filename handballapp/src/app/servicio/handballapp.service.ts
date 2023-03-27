import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {jugador} from './jugador'


@Injectable({
  providedIn: 'root'
})
export class HandballappService {

  API: string='http://localhost/app/index.php';

  constructor(private clienteHttp:HttpClient) { }

  AgregarJugador(datosJugador:jugador):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertar=1",datosJugador);
  }

  AgregarAPartido(DatosJugador:any):Observable<any>{
    return this.clienteHttp.post(this.API+"?partido=1",DatosJugador);
  }

  ListarJugadores(cat:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?categoria="+cat);
  }

  BorrarJugador(dni:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?borrar="+dni);
  }

  ObtenerJugador(dni:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultar="+dni);
  }

  EditarEmpleado(dni:any,datosJugador:any):Observable<any>{
    return this.clienteHttp.post(this.API+"?actualizar="+dni,datosJugador);
  }
}
