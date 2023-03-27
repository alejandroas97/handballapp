import { Component, OnInit, Input } from '@angular/core';
import { HandballappService } from 'src/app/servicio/handballapp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { jugador } from 'src/app/servicio/jugador';
import { PrimeNGConfig } from 'primeng/api';



@Component({
  selector: 'app-picklist',
  templateUrl: './picklist.component.html',
  styleUrls: ['./picklist.component.css']
})
export class PicklistComponent implements OnInit {
  jugadores: jugador[] = [];
  lacat:any;
  sourceProducts: jugador[] = [];

  targetProducts: jugador[] = [];

  constructor(
    private handballappService:HandballappService,
    private activeRoute:ActivatedRoute,
    private ruteador:Router,
    private primengConfig: PrimeNGConfig
  ) {
    this.lacat=this.activeRoute.snapshot.paramMap.get('cat');
    console.log(this.lacat);
   }

  ngOnInit(): void {
    this.handballappService.ListarJugadores(this.lacat).subscribe(respuesta=>{
      console.log(respuesta);
      this.jugadores=respuesta;
    });
    this.targetProducts = [];
    this.primengConfig.ripple = true;
  }
  borrarRegistro(dni:any,iControl:any){
    console.log(dni);
    this.handballappService.BorrarJugador(dni).subscribe((respuesta)=>{
      this.jugadores.splice(iControl,1);
    });
  }

}
