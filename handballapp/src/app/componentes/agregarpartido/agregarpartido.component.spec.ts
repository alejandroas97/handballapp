import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarpartidoComponent } from './agregarpartido.component';

describe('AgregarpartidoComponent', () => {
  let component: AgregarpartidoComponent;
  let fixture: ComponentFixture<AgregarpartidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarpartidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarpartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
