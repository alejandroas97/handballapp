import { Component, OnInit, Input } from '@angular/core';
import { HandballappService } from 'src/app/servicio/handballapp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { jugador } from 'src/app/servicio/jugador';
import { SortEvent } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-statelist',
  providers: [MessageService],
  templateUrl: './statelist.component.html',
  styles: [`
      :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
          position: -webkit-sticky;
          position: sticky;
          top: 0;
      }
      p-table {
        font-size: 16px;
        width: 100%
      }
      th

      .layout-news-active :host ::ng-deep .p-datatable tr > th {
          top: 0;
      }

      @media screen and (max-width: 64em) {
          :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
              top: 0;
          }
          .layout-news-active :host ::ng-deep .p-datatable tr > th {
              top: 0;
          }
      }
  `]
})
export class StatelistComponent implements OnInit {
  jugadores: jugador[] = [];
  lacat:any;
  selectedjugadores: any[] = [];
  mostrar:any;
  loading = false;
  dnijugadormodal: any;
  nombrejugadormodal: any;
  iControl:any;

  constructor(
    private handballappService:HandballappService,
    private activeRoute:ActivatedRoute,
    private ruteador:Router,
    private messageService: MessageService
  ) { 
    this.lacat=this.activeRoute.snapshot.paramMap.get('cat');
    console.log(this.lacat);
  
   }

  ngOnInit(): void {
    const customFilterName = "custom-equals";
    this.handballappService.ListarJugadores(this.lacat).subscribe(respuesta=>{
      console.log(respuesta);
      this.jugadores=respuesta;
    });
    console.log(this.selectedjugadores);
  }
  deleteSelectedProducts() {
    console.log(this.selectedjugadores);
  }

  IrPartido():any{
    this.loading = true;
    for (const jugador of this.selectedjugadores){
      this.handballappService.AgregarAPartido(jugador).subscribe();
    }
    setTimeout(()=>{
      this.ruteador.navigateByUrl('/partido');
    }, 1500);
    
  }

  AbrirModal(dni:any,iControl:any,nombre:any,apellidos:any){
    console.log(iControl);
    this.dnijugadormodal=dni;
    this.iControl=iControl;
    this.nombrejugadormodal=nombre+' '+apellidos;
  }

  borrarRegistro(){
    console.log(this.dnijugadormodal);
    this.handballappService.BorrarJugador(this.dnijugadormodal).subscribe((respuesta)=>{
      this.jugadores.splice(this.iControl,1);
      this.messageService.add({severity:'success', summary: 'Hecho!', detail: 'Jugador eliminado correctamente'});
    });
  } 

  AgregarJugador(){
    this.ruteador.navigateByUrl('/agregar-jugador');
  }
  

}
