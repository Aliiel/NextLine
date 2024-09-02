import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireSiretComponent } from './formulaire-siret.component';

describe('FormulaireSiretComponent', () => {
  let component: FormulaireSiretComponent;
  let fixture: ComponentFixture<FormulaireSiretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireSiretComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireSiretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
