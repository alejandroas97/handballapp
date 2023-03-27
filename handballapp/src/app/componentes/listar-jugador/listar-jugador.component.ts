import { Component, OnInit } from '@angular/core';
import { HandballappService } from 'src/app/servicio/handballapp.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-jugador',
  templateUrl: './listar-jugador.component.html',
  styleUrls: ['./listar-jugador.component.css']
})
export class ListarJugadorComponent implements OnInit {
  jugadores:any;
  lacat:any;
  showAge:any;

  constructor(
    private activeRoute:ActivatedRoute,
    private ruteador:Router,
    private handballappService:HandballappService
    
  ) {
    this.lacat=this.activeRoute.snapshot.paramMap.get('cat');
    console.log(this.lacat);
   }

  ngOnInit(): void {
    this.handballappService.ListarJugadores(this.lacat).subscribe(respuesta=>{
      console.log(respuesta);
      this.jugadores=respuesta;
    }); 

  }
  borrarRegistro(dni:any,iControl:any){
    console.log(dni);
    console.log(iControl);
    if(window.confirm("¿Desea borrar el registro?")){
      this.handballappService.BorrarJugador(dni).subscribe((respuesta)=>{
        this.jugadores.splice(iControl,1);
      });
    }
  }
  calcularEdad(fech_nacim:any){
    console.log(fech_nacim);
    if(fech_nacim){
      const convertAge = new Date(fech_nacim);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }
  }

}
