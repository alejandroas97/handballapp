import { Component, OnInit } from '@angular/core';
import { NavigationEnd, provideRoutes, Router } from '@angular/router';
import { PartidoService } from 'src/app/servicio/partido.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-listacategorias',
  providers: [MessageService],
  templateUrl: './listacategorias.component.html',
  styleUrls: ['./listacategorias.component.css']
})
export class ListacategoriasComponent implements OnInit {
  categorias: any[]=[];
  codcategoriamodal: any;
  iControl:any;
  nombrecategoria: any;

  constructor(
    private ruteador:Router,
    private partidoService:PartidoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.partidoService.ObtenerCategorias().subscribe(respuesta=>{
      this.categorias = respuesta;
      console.log(this.categorias);
    });
  }

  AbrirModal(cod:any,iControl:any){
    console.log(iControl);
    this.codcategoriamodal=cod;
    this.iControl=iControl;
  }


  borrarRegistro(){
    console.log(this.codcategoriamodal);
    this.partidoService.BorrarCategoria(this.codcategoriamodal).subscribe((respuesta)=>{
      this.categorias.splice(this.iControl,1);
      this.messageService.add({severity:'success', summary: 'Hecho!', detail: 'Jugador eliminado correctamente'});
    });
  } 

}
