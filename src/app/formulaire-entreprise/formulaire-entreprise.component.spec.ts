import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireEntrepriseComponent } from './formulaire-entreprise.component';

describe('FormulaireEntrepriseComponent', () => {
  let component: FormulaireEntrepriseComponent;
  let fixture: ComponentFixture<FormulaireEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireEntrepriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
