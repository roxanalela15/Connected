import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesajeComponent } from './mesaje.component';

describe('MesajeComponent', () => {
  let component: MesajeComponent;
  let fixture: ComponentFixture<MesajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
