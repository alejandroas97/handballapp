import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarJugadorComponent } from './listar-jugador.component';

describe('ListarJugadorComponent', () => {
  let component: ListarJugadorComponent;
  let fixture: ComponentFixture<ListarJugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarJugadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
