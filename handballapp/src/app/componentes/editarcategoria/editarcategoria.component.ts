import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { dia } from 'src/app/servicio/dias';
import { JugadoresService } from 'src/app/servicio/jugadores.service';
import { PartidoService } from 'src/app/servicio/partido.service';


@Component({
  selector: 'app-editarcategoria',
  templateUrl: './editarcategoria.component.html',
  styleUrls: ['./editarcategoria.component.css']
})
export class EditarcategoriaComponent implements OnInit {
  categoria:any;
  click=0;
  dias: dia[];
  diahora: any[]=[];
  diaseleccionado1: dia = new dia;
  diaseleccionado2: dia = new dia;
  diaseleccionado3: dia = new dia;
  diaseleccionado4: dia = new dia;
  horaseleccionada1: any;
  horaseleccionada2: any;
  horaseleccionada3: any;
  horaseleccionada4: any;
  categoriaobtenida: any;
  enviodia: {horario: any} = {horario: ''};

  constructor(
    private ruteador:Router,
    private activeRoute:ActivatedRoute,
    private jugadoresService:JugadoresService,
    private partidoService:PartidoService,
  ) {
    this.dias = [
      {name: 'Lunes'},
      {name: 'Martes'},
      {name: 'Miércoles'},
      {name: 'Jueves'},
      {name: 'Viernes'},
      {name: 'Sábado'},
      {name: 'Domingo'}
    ];

    this.categoria=this.activeRoute.snapshot.paramMap.get('id')
    console.log(this.categoria);

    this.jugadoresService.ObtenerCategoria(this.categoria).subscribe(
      respuesta=>{
        for (const categoria of respuesta){
          this.categoriaobtenida = categoria;
        }
        console.log(this.categoriaobtenida);
        console.log(this.categoriaobtenida.dnientrenador);
    });
   }

  ngOnInit(): void {

  }

  AgregarDia(){
    this.click++;
  }

  QuitarDia(){
    this.click--;
    if (this.click == 0){
      this.diaseleccionado2 = new dia;
      this.horaseleccionada2 = undefined;
    }
    if (this.click == 1){
      this.diaseleccionado3 = new dia;
      this.horaseleccionada3 = undefined;
    }
    else if (this.click == 2){
      this.diaseleccionado4 = new dia;
      this.horaseleccionada4 = undefined;
    }
  }

  GuardarCambios(){
    console.log(this.diaseleccionado1);
    console.log(this.diaseleccionado2);
    console.log(this.diaseleccionado3);
    console.log(this.diaseleccionado4);
    console.log(this.horaseleccionada1);
    console.log(this.horaseleccionada2);
    console.log(this.horaseleccionada3);
    console.log(this.horaseleccionada4);
    let clave1 = Object.values(this.diaseleccionado1);
    let clave2 = Object.values(this.diaseleccionado2);
    let clave3 = Object.values(this.diaseleccionado3);
    let clave4 = Object.values(this.diaseleccionado4);
    if (clave1[0] != undefined && clave2[0] == undefined){
      this.diahora = [{dia1: clave1[0], hora1: this.horaseleccionada1}];
      console.log('Ha entrado al 1');
    }
    else if (clave1[0] != undefined && clave2[0] != undefined && clave3[0] ==undefined){
      this.diahora = [{dia1: clave1[0], hora1: this.horaseleccionada1},
      {dia2: clave2[0], hora2: this.horaseleccionada2}];
      console.log('Ha entrado al 2');
    }
    else if (clave1[0] != undefined&& clave2[0] != undefined && clave3[0] !=undefined && clave4[0] == undefined){
      this.diahora = [{dia1: clave1[0], hora1: this.horaseleccionada1},
      {dia2: clave2[0], hora2: this.horaseleccionada2},
      {dia3: clave3[0], hora3: this.horaseleccionada3}];
      console.log('Ha entrado al 3');
    } else {
      this.diahora = [{dia1: clave1[0], hora1: this.horaseleccionada1},
      {dia2: clave2[0], hora2: this.horaseleccionada2},
      {dia3: clave3[0], hora3: this.horaseleccionada3},
      {dia4: clave4[0], hora4: this.horaseleccionada4}];
      console.log('Ha entrado al 4');
    }
    for (const valor of this.diahora){
      console.log(valor);
      let claves = Object.values(valor);
      this.enviodia.horario = this.enviodia.horario + claves[0] + '/' + claves[1] + ',';
    }
    console.log(this.enviodia);
    this.diaseleccionado1 = new dia;
    this.diaseleccionado2 = new dia;
    this.diaseleccionado3 = new dia;
    this.diaseleccionado4 = new dia;
    this.horaseleccionada1 = undefined;
    this.horaseleccionada2 = undefined;
    this.horaseleccionada3 = undefined;
    this.horaseleccionada4 = undefined;
    this.click = 0;
    this.partidoService.EditarHoraCategoria(this.categoria,this.enviodia).subscribe(()=>{
      this.ruteador.navigateByUrl('/listacategorias');
    });
  }

}
