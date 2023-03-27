import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { AppComponent } from './app.component';

import { AgregarJugadorComponent } from './componentes/agregar-jugador/agregar-jugador.component';
import { EditarJugadorComponent } from './componentes/editar-jugador/editar-jugador.component';
import { ListarJugadorComponent } from './componentes/listar-jugador/listar-jugador.component';
import { StatelistComponent } from './componentes/statelist/statelist.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import { HandballappService } from './servicio/handballapp.service';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './pipes/filter.pipe';
import { PicklistComponent } from './componentes/picklist/picklist.component';
import {PickListModule} from 'primeng/picklist';
import {DataViewModule} from 'primeng/dataview';
import { PartidoComponent } from './componentes/partido/partido.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CardModule} from 'primeng/card';
import { CalendariopartidosComponent } from './componentes/calendariopartidos/calendariopartidos.component';
import { AgregarpartidoComponent } from './componentes/agregarpartido/agregarpartido.component';
import { ListacategoriasComponent } from './componentes/listacategorias/listacategorias.component';
import { EditarcategoriaComponent } from './componentes/editarcategoria/editarcategoria.component';
import {InputMaskModule} from 'primeng/inputmask';
import {SelectButtonModule} from 'primeng/selectbutton';
import {InputTextareaModule} from 'primeng/inputtextarea';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    AgregarJugadorComponent,
    EditarJugadorComponent,
    ListarJugadorComponent,
    StatelistComponent,
    FilterPipe,
    PicklistComponent,
    PartidoComponent,
    CalendariopartidosComponent,
    AgregarpartidoComponent,
    ListacategoriasComponent,
    EditarcategoriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    ToastModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule,
    PickListModule,
    DataViewModule,
    InputNumberModule,
    RadioButtonModule,
    ConfirmDialogModule,
    CardModule,
    FullCalendarModule,
    InputMaskModule,
    SelectButtonModule,
    InputTextareaModule
  ],
  providers: [HandballappService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
