import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { jugador } from './jugador';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
  API: string ='http://localhost/app/';

  constructor(private clienteHttp:HttpClient) { }

  NumeroGoles(dni:any):Observable<any>{
    return this.clienteHttp.get(this.API+'golesjugadores.php'+"?consultar="+dni);
  }

  NumeroInfracciones(dni:any):Observable<any>{
    return this.clienteHttp.get(this.API+'infraccionesjugadores.php'+"?consultar="+dni);
  }

  NumeroErrores(dni:any):Observable<any>{
    return this.clienteHttp.get(this.API+'erroresjugadores.php'+"?consultar="+dni);
  }


  ObtenerCategoria(cat:any):Observable<any>{
    return this.clienteHttp.get(this.API+'editarcategoria.php'+"?consultar="+cat);
  }

}
