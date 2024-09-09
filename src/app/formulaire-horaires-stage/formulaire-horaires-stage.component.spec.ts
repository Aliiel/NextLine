import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireHorairesStageComponent } from './formulaire-horaires-stage.component';

describe('FormulaireHorairesStageComponent', () => {
  let component: FormulaireHorairesStageComponent;
  let fixture: ComponentFixture<FormulaireHorairesStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireHorairesStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireHorairesStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
