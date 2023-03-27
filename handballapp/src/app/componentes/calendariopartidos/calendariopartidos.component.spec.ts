import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendariopartidosComponent } from './calendariopartidos.component';

describe('CalendariopartidosComponent', () => {
  let component: CalendariopartidosComponent;
  let fixture: ComponentFixture<CalendariopartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendariopartidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendariopartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
