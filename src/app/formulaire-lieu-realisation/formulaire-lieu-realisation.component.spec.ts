import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireLieuRealisationComponent } from './formulaire-lieu-realisation.component';

describe('FormulaireLieuRealisationComponent', () => {
  let component: FormulaireLieuRealisationComponent;
  let fixture: ComponentFixture<FormulaireLieuRealisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireLieuRealisationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireLieuRealisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
