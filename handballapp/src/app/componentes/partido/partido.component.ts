import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PartidoService } from 'src/app/servicio/partido.service';
import { jugador } from 'src/app/servicio/jugador';
import { FormGroup, FormBuilder } from '@angular/forms';
import { estadistica } from 'src/app/servicio/estadistica';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import { partido } from 'src/app/servicio/partido';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css'],
  styles: [`
    table {
      font-size: 13px;
      margin: 0px;
      padding: 0px;
    }
    td {
      width: auto;
      padding: 0px;
    }
`]
})
export class PartidoComponent implements OnInit {
  displayBasic: boolean = true;
  local: number = 0;
  visitante: number = 0;
  jugadorespartido: jugador [] = [];
  partidos: partido [] = [];
  formulariogoles:FormGroup;
  formularioparte:FormGroup;
  formularioinfraccion:FormGroup;
  formularioerror:FormGroup;
  jugadormodal: any;
  apellidomodal:any;
  estadisticas: estadistica[] = [];
  distancia: string = '';
  parte: string = '';
  lugar_porteria: string = '';
  altura_porteria: string = '';
  enviojugador: any[]=[];
  envioinfraccion: any;
  envioerror: any;
  seleccionpartido: partido[]=[];
  partidoenjuego: partido = new partido;
  reloj: {minuto: any, segundo:any} = {minuto: 30,segundo:0};
  interval: any;
  onoff: boolean = false;
  numerocaracteres: number=0;

  constructor(
    private partidoService:PartidoService,
    public formulario:FormBuilder
  ) {
    this.formulariogoles=this.formulario.group({
      lugar:[''],
      altura:[''],
      distancia:['']
    });

    this.formularioparte=this.formulario.group({
      parte:'1ª'
    })

    this.formularioinfraccion=this.formulario.group({
      infraccion:['']
    });

    this.formularioerror=this.formulario.group({
      error:[''],
      descripcion:['']
    });


    
    
    
   }


  ngOnInit(): void {
    this.displayBasic = true;
    
    window.onbeforeunload = function() {
      return "Are you sure?";
    };
    
    this.partidoService.ObtenerPartidos().subscribe(respuesta=>{
      this.partidos = respuesta;
    });
    
    this.partidoService.ObtenerJugadoresPartido().subscribe(respuesta=>{
      this.jugadorespartido = respuesta;
      for (const jugadores of this.jugadorespartido){
        this.estadisticas.push({nombre: jugadores.nombre, 
          apellidos: jugadores.apellidos, 
          dni: jugadores.dni,
          cod_categoria: jugadores.cod_categoria,
          IAr9:0,
          CAr9:0,
          DAr9:0,
          IMe9:0,
          CMe9:0,
          DMe9:0,
          IAb9:0,
          CAb9:0,
          DAb9:0,
          IAr7:0,
          CAr7:0,
          DAr7:0,
          IMe7:0,
          CMe7:0,
          DMe7:0,
          IAb7:0,
          CAb7:0,
          DAb7:0,
          IAr6:0,
          CAr6:0,
          DAr6:0,
          IMe6:0,
          CMe6:0,
          DMe6:0,
          IAb6:0,
          CAb6:0,
          DAb6:0,
          amarilla:0,
          min2:0,
          PerBal:0,
          TirFa:0,
          ErrDef:0
        });
      }
      console.log(this.estadisticas);
    });
  }

  tick(){
    this.reloj.segundo--;
    if (this.reloj.segundo < 0){
      this.reloj.segundo = 59;
      this.reloj.minuto--;
    }
  }


  startTimer() {
    this.onoff=true;
    this.interval = setInterval(() => {
      this.reloj.segundo--;
      if (this.reloj.segundo < 10 && this.reloj.segundo >= 0){
        this.reloj.segundo = `0${this.reloj.segundo}`;
        console.log(this.reloj.segundo);
      }
      if (this.reloj.segundo < 0){
        this.reloj.segundo = 59;
        this.reloj.minuto--;
      }
    },1000)
  }

  pauseTimer() {
    this.onoff=false;
    clearInterval(this.interval);
  }

  Enviar(){
    console.log(this.seleccionpartido[0]);
    this.partidoenjuego = this.seleccionpartido[0];
    for (const partido of this.seleccionpartido){
      console.log(partido.cod);
    }
    this.displayBasic=false;
  }

  AbrirModal(nombre:any,apellidos:any){
    console.log(nombre);
    this.jugadormodal = nombre;
    this.apellidomodal = apellidos;
  }
  
  cargar(){
    document.getElementById("modalgol");
  }

  EliminarPartido(){
    this.partidoService.EliminarJugadoresEstadistica().subscribe();
  }

  GuardarError(){
    if (this.reloj.segundo==0){
      this.reloj.segundo='00';
    }
    this.envioerror = [];
    let val = Object.values(this.formularioparte.value);
    this.parte = String(val[0]);
    console.log(this.formularioerror.value);
    let valores = Object.values(this.formularioerror.value);
    for (const jugador of this.estadisticas){
      if (jugador.nombre === this.jugadormodal && jugador.apellidos === this.apellidomodal){
        this.envioerror = {dni: jugador.dni, cod_cat: jugador.cod_categoria,
          tipo: valores[0],
          descripcion: valores[1],
          cod_partido: Number(this.partidoenjuego.cod),
          minuto: this.reloj.minuto.toString()+':'+this.reloj.segundo.toString(),
          parte: this.parte
        }
        if (valores[0] == 'Pérdida Balón'){
          jugador.PerBal++;
        }
        else if (valores[0] == 'Tiro Fallado'){
          jugador.TirFa++;
        }
        else {
          jugador.ErrDef++;
        }
      }
    }
    console.log(this.envioerror);
    this.partidoService.InsertarError(this.envioerror).subscribe();
    this.formularioerror=this.formulario.group({
      error:[''],
      descripcion:['']
    });
  }

  GuardarInfraccion(){
    if (this.reloj.segundo==0){
      this.reloj.segundo='00';
    }
    this.envioinfraccion = [];
    let val = Object.values(this.formularioparte.value);
    this.parte = String(val[0]);
    let valores = Object.values(this.formularioinfraccion.value);
    for (const jugador of this.estadisticas){
      if (jugador.nombre === this.jugadormodal && jugador.apellidos === this.apellidomodal){
        this.envioinfraccion = {dni: jugador.dni, cod_cat: jugador.cod_categoria,
          tipo: valores[0],
          cod_partido: Number(this.partidoenjuego.cod),
          minuto: this.reloj.minuto.toString()+':'+this.reloj.segundo.toString(),
          parte: this.parte
        }
        if (valores[0] == 'amarilla'){
          jugador.amarilla++;
        }
        else {
          jugador.min2++;
        }
      }
    }
    console.log(this.envioinfraccion);
    this.partidoService.InsertarInfraccion(this.envioinfraccion).subscribe();
  }

  GuardarGol(){
    if (this.reloj.segundo==0){
      this.reloj.segundo='00';
    }
    this.enviojugador = [];
    this.lugar_porteria = '';
    this.altura_porteria= '';
    this.distancia='';
    let donde = "";
    let val = Object.values(this.formularioparte.value);
    this.parte = String(val[0]);
    let valores = Object.values(this.formulariogoles.value);
    if (valores[0] === 'I'){
      this.lugar_porteria = 'Izquierda';
    }
    else if (valores[0] === 'C'){
      this.lugar_porteria = 'Centro';
    }
    else if (valores[0] === 'D'){
      this.lugar_porteria = 'Derecha';
    }
    if (valores[1] === 'Ar'){
      this.altura_porteria = 'Arriba';
    }
    else if (valores[1] === 'Me'){
      this.altura_porteria = 'Medio';
    }
    else if (valores[1] === 'Ab'){
      this.altura_porteria = 'Abajo';
    }
    if (valores[2] === '9'){
      this.distancia= '≥9 metros';
    }
    else if (valores[2] === '7'){
      this.distancia= '7 metros';
    }
    else if (valores[2] === '6'){
      this.distancia= '6 metros';
    }
    for(let i=0; i< valores.length; i++){
      donde = donde + valores[i];
    }
    for (const jugador of this.estadisticas){
      if (jugador.nombre === this.jugadormodal && jugador.apellidos === this.apellidomodal){
        this.enviojugador.push({dni: jugador.dni, cod_cat: jugador.cod_categoria,
        lugar_porteria:this.lugar_porteria,
        altura_porteria:this.altura_porteria,
        distancia: this.distancia,
        cod_partido: Number(this.partidoenjuego.cod),
        minuto: this.reloj.minuto.toString()+':'+this.reloj.segundo.toString(),
        parte: this.parte
      })
        if (donde === 'IAr9'){
          jugador.IAr9++;
        }
        else if (donde === 'IMe9'){
          jugador.IMe9++;
        }
        else if (donde === 'IAb9'){
          jugador.IAb9++;
        }
        else if (donde === 'CAr9'){
          jugador.CAr9++;
        }
        else if (donde === 'CMe9'){
          jugador.CMe9++;
        }
        else if (donde === 'CAb9'){
          jugador.CAb9++;
        }
        else if (donde === 'DAr9'){
          jugador.DAr9++;
        }
        else if (donde === 'DMe9'){
          jugador.DMe9++;
        }
        else if (donde === 'DAb9'){
          jugador.DAb9++;
        }
        else if (donde === 'IAr7'){
          jugador.IAr7++;
        }
        else if (donde === 'IMe7'){
          jugador.IMe7++;
        }
        else if (donde === 'IAb7'){
          jugador.IAb7++;
        }
        else if (donde === 'CAr7'){
          jugador.CAr7++;
        }
        else if (donde === 'CMe7'){
          jugador.CMe7++;
        }
        else if (donde === 'CAb7'){
          jugador.CAb7++;
        }
        else if (donde === 'DAr7'){
          jugador.DAr7++;
        }
        else if (donde === 'DMe7'){
          jugador.DMe7++;
        }
        else if (donde === 'DAb7'){
          jugador.DAb7++;
        }
        else if (donde === 'IAr6'){
          jugador.IAr6++;
        }
        else if (donde === 'IMe6'){
          jugador.IMe6++;
        }
        else if (donde === 'IAb6'){
          jugador.IAb6++;
        }
        else if (donde === 'CAr6'){
          jugador.CAr6++;
        }
        else if (donde === 'CMe6'){
          jugador.CMe6++;
        }
        else if (donde === 'CAb6'){
          jugador.CAb6++;
        }
        else if (donde === 'DAr6'){
          jugador.DAr6++;
        }
        else if (donde === 'DMe6'){
          jugador.DMe6++;
        }
        else if (donde === 'DAb6'){
          jugador.DAb6++;
        }
        console.log(this.enviojugador[0]);
        this.partidoService.InsertarGol(this.enviojugador[0]).subscribe();
        this.local++;
      }
    }
  }
}
