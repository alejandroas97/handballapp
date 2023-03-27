import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { NavigationEnd, provideRoutes, Router } from '@angular/router';
import { PartidoService } from 'src/app/servicio/partido.service';
import { partido } from 'src/app/servicio/partido';
import { ParsedProperty } from '@angular/compiler';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import esLocale from '@fullcalendar/core/locales/es';
import { HandballappService } from 'src/app/servicio/handballapp.service';
import { JugadoresService } from 'src/app/servicio/jugadores.service';

@Component({
  selector: 'app-calendariopartidos',
  templateUrl: './calendariopartidos.component.html',
  styleUrls: ['./calendariopartidos.component.css']
})
export class CalendariopartidosComponent implements OnInit {
  partidos: any[] = [];
  calendarOptions!: CalendarOptions;
  events: any[] = [];
  options: any;
  fecha:any[]=[];
  displayBasic: boolean = true;
  fechaseleccionada!: string;
  horaseleccionada!: string;
  formularioDeJugadores:FormGroup;
  partidoañadir: any;
  codigoeliminar: any;

  constructor(
    public formulario:FormBuilder,
    private partidoService:PartidoService,
    private ruteador:Router
    ) {
      
      

      this.formularioDeJugadores=this.formulario.group({
        fecha:[''],
        hora:[''],
        equipo_contrario:[''],
        cod_categoria:[''],        
      });
     }

  ngOnInit(): void {
    this.displayBasic = false;
    this.partidoService.ObtenerPartidosCalendario().subscribe(respuesta=>{
      this.partidos = respuesta;
      console.log(this.partidos);
      for (const clave of this.partidos){
        this.events.push({title: clave.cod_categoria+' '+'vs'+' '+clave.equipo_contrario+' Código: '+clave.cod, start: clave.fecha+'T'+clave.hora, description: clave.cod})
      }
      console.log(this.events);
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick.bind(this), // bind is important!
        headerToolbar: {
          left: 'dayGridMonth timeGridWeek timeGridDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: function(info) {
          let hora = '';
          for (let i=11;i <=15;i++){
            hora = hora + info.event.startStr[i];
          }
          let index = info.event.title.indexOf(": ");
          let cod = '';
          for (let i = index+2; i < info.event.title.length; i++){
            cod = cod + info.event.title[i];
          }
          console.log('Código:'+cod);
          console.log(hora);
          if (confirm('¿Desea eliminar el partido: ' + info.event.title  +' Hora: '+ hora + 'h?')) {
            console.log("You pressed OK!");
            fetch('http://localhost/app/eliminarpartido.php'+"?borrar="+cod);
            window.setTimeout(function(){location.reload()},500)
          }
          info.el.style.borderColor = 'red';
        },
        eventTimeFormat: { // like '14:30:00'
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        },
        height: 500,
        locales: [esLocale],
        events: this.events,
        editable: true,
        selectable:true,
        selectMirror: true,
        dayMaxEvents: true
      };
    });



  }


  agregarPartido(){
    let valores = Object.values(this.formularioDeJugadores.value);
    console.log(valores);
    if (valores[0] == ''){
      valores[0] = this.fechaseleccionada;
    }

    if (valores[1] == ''){
      valores[1] = this.horaseleccionada;
    }
    
    this.partidoañadir = {fecha: valores[0], hora: valores[1], equipo_contrario: valores[2], cod_categoria: valores[3]}
    console.log(this.partidoañadir);
    this.partidoService.InsertarPartidos(this.partidoañadir).subscribe();
    this.formularioDeJugadores=this.formulario.group({
      fecha:[''],
      hora:[''],
      equipo_contrario:[''],
      cod_categoria:[''],        
    });
    this.displayBasic=false;
    this.refresh();
  }

  refresh(): void {  window.setTimeout(function(){location.reload()},500) }

  handleDateClick(arg: { dateStr: string; }) {
    console.log(arg.dateStr.length);
    this.displayBasic=true;
    this.fechaseleccionada='';
    this.horaseleccionada='';
    for (let i=0; i<=9; i++){
      this.fechaseleccionada = this.fechaseleccionada + arg.dateStr[i];
    }
    if (arg.dateStr.length > 10){
      for (let i=11; i<=15; i++){
        this.horaseleccionada = this.horaseleccionada + arg.dateStr[i];
      }
    }  
    console.log(`Fecha:${this.fechaseleccionada}`);
    console.log(`Hora:${this.horaseleccionada}`);
  }
}


