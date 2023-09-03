import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDetalhadaComponent } from './lista-detalhada.component';

describe('ListaDetalhadaComponent', () => {
  let component: ListaDetalhadaComponent;
  let fixture: ComponentFixture<ListaDetalhadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDetalhadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDetalhadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
