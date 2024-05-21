import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesNotaComponent } from './detalles.component';

describe('DetallesNotaComponent', () => {
  let component: DetallesNotaComponent;
  let fixture: ComponentFixture<DetallesNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesNotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
