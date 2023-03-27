import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListacategoriasComponent } from './listacategorias.component';

describe('ListacategoriasComponent', () => {
  let component: ListacategoriasComponent;
  let fixture: ComponentFixture<ListacategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListacategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListacategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
