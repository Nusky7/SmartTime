import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FomularioNotasComponent } from './fomulario-notas.component';

describe('FomularioNotasComponent', () => {
  let component: FomularioNotasComponent;
  let fixture: ComponentFixture<FomularioNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FomularioNotasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FomularioNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
