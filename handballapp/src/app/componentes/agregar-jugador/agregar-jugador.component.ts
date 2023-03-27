import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { HandballappService } from 'src/app/servicio/handballapp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-jugador',
  templateUrl: './agregar-jugador.component.html',
  styleUrls: ['./agregar-jugador.component.css']
})
export class AgregarJugadorComponent implements OnInit {
  formularioDeJugadores:FormGroup;

  constructor(
    public formulario:FormBuilder,
    private handballappService:HandballappService,
    private ruteador:Router
    ) {
    
    this.formularioDeJugadores=this.formulario.group({
      nombre:['',Validators.required],
      apellidos:['',Validators.required],
      dni:['',Validators.required],
      correo:['',[Validators.required, Validators.email]],
      cod_categoria:['',Validators.required],
      movil:['',Validators.required],
      telefono:['',Validators.required],
      fech_nacim:['',Validators.required]
    });
   }

  ngOnInit(): void {
  }

  enviarDatos():any{
    console.log(this.formularioDeJugadores.value);
    console.log("Usted ha presionado el botón");
    console.log(this.formularioDeJugadores.value);
    console.log(typeof(this.formularioDeJugadores.value));
    this.handballappService.AgregarJugador(this.formularioDeJugadores.value).subscribe();
    this.ruteador.navigateByUrl('/statelist/todos');
  }

  

}
