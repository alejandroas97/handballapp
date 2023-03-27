import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HandballappService } from 'src/app/servicio/handballapp.service';
import { JugadoresService } from 'src/app/servicio/jugadores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { goles } from 'src/app/servicio/goles';

@Component({
  selector: 'app-editar-jugador',
  templateUrl: './editar-jugador.component.html',
  styleUrls: ['./editar-jugador.component.css']
})
export class EditarJugadorComponent implements OnInit {
  formularioDeJugadores:FormGroup;
  jugadores:any;
  elDNI:any;
  goles: goles[]=[];
  infracciones: any[]=[];
  errores: any[]=[];
  numgoles:number=0;
  numinfracciones:number=0;
  numerrores:number=0;
  partidometido: number=0;

  constructor(
    private activeRoute:ActivatedRoute,
    public formulario:FormBuilder,
    private ruteador:Router,
    private handballappService:HandballappService,
    private jugadoresService:JugadoresService
  ) {
    this.elDNI=this.activeRoute.snapshot.paramMap.get('id')
    console.log(this.elDNI);

    this.jugadoresService.NumeroGoles(this.elDNI).subscribe(
      respuesta=>{
        this.goles=respuesta;
        const arraycod: unknown[] = [];
        for (const row of this.goles){
          this.numgoles++;
          let valores = Object.values(row);
          if (arraycod.includes(valores[6])){
          }
          else{
            arraycod.push(valores[6]);
          }
        }
        for (const numero of arraycod){
          this.partidometido++;
        }
      }
    );

    this.jugadoresService.NumeroInfracciones(this.elDNI).subscribe(
      respuesta=>{
        for (const linea of respuesta){
          this.infracciones.push(linea);
        };
        console.log(this.infracciones);
        const arraycod: unknown[] = [];
        for (const row of this.infracciones){
          this.numinfracciones++;
          let valores = Object.values(row);
          if (arraycod.includes(valores[6])){
          }
          else{
            arraycod.push(valores[6]);
          }
        }
      }
    );

    this.jugadoresService.NumeroErrores(this.elDNI).subscribe(
      respuesta=>{
        for (const linea of respuesta){
          this.errores.push(linea);
        };
        console.log(this.errores);
        const arraycod: unknown[] = [];
        for (const row of this.errores){
          this.numerrores++;
          let valores = Object.values(row);
          if (arraycod.includes(valores[6])){
          }
          else{
            arraycod.push(valores[6]);
          }
        }
      }
    );
    
    this.handballappService.ObtenerJugador(this.elDNI).subscribe(
      respuesta=>{
        this.jugadores=respuesta;
        console.log(respuesta);
        console.log(typeof(respuesta));
        this.formularioDeJugadores.setValue({
          nombre:respuesta[0]['nombre'],
          apellidos:respuesta[0]['apellidos'],
          dni:respuesta[0]['dni'],
          correo:respuesta[0]['correo'],
          cod_categoria:respuesta[0]['cod_categoria'],
          movil:respuesta[0]['movil'],
          telefono:respuesta[0]['telefono'],
          fech_nacim:respuesta[0]['fech_nacim']
        });
      }
    );
    this.formularioDeJugadores=this.formulario.group({
      nombre:[''],
      apellidos:[''],
      dni:[''],
      correo:[''],
      cod_categoria:[''],
      movil:[''],
      telefono:[''],
      fech_nacim:['']
    });
  }

  ngOnInit(): void {
    
  }
  enviarDatos():any{
    console.log(this.elDNI);
    console.log(this.formularioDeJugadores.value);
    this.handballappService.EditarEmpleado(this.elDNI,this.formularioDeJugadores.value).subscribe(()=>{
      this.ruteador.navigateByUrl('/statelist/todos');
      console.log(this.formularioDeJugadores.value);
    });
  }

}
