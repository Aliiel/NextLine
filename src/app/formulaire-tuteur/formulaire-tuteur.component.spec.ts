import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireTuteurComponent } from './formulaire-tuteur.component';

describe('FormulaireTuteurComponent', () => {
  let component: FormulaireTuteurComponent;
  let fixture: ComponentFixture<FormulaireTuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireTuteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
