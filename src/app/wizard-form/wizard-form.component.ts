import { Component, Input, ViewChild , AfterViewInit} from '@angular/core';
import { FormulaireEntrepriseComponent } from '../formulaire-entreprise/formulaire-entreprise.component';
import { FormulaireTuteurComponent } from '../formulaire-tuteur/formulaire-tuteur.component';
import { FormulaireHorairesStageComponent } from '../formulaire-horaires-stage/formulaire-horaires-stage.component';
import { FormulaireComponent } from '../formulaire/formulaire.component';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-wizard-form',
  standalone: true,
  imports: [FormulaireEntrepriseComponent, FormulaireTuteurComponent,FormulaireHorairesStageComponent, FormulaireComponent, NgIf],
  templateUrl: './wizard-form.component.html',
  styleUrl: './wizard-form.component.css'
})
export class WizardFormComponent {

  @Input() currentStep: number = 1;
  totalSteps: number = 3; 

  @ViewChild(FormulaireEntrepriseComponent) formulaireEntrepriseComponent!: FormulaireEntrepriseComponent;

  @ViewChild(FormulaireTuteurComponent) formulaireTuteurComponent!: 
  FormulaireTuteurComponent;

  ngAfterViewInit(): void {
    // Vérifie si les composants sont bien initialisés
    console.log(this.formulaireTuteurComponent);
    console.log(this.formulaireEntrepriseComponent);
  }

  goToStep(step: number): void {
    if (step >= 1 && step <= this.totalSteps) {
      if (step > this.currentStep) {
        if (this.currentStep === 1) {

          console.log("etape actuelle : ", this.currentStep);
          
          this.formulaireEntrepriseComponent.onSubmit();  
        }

        if (this.currentStep == 2) {

          console.log("etape actuelle : ", this.currentStep);

          this.formulaireTuteurComponent.onSubmit();
        }

        this.currentStep++;
        console.log("etape actuelle : ", this.currentStep);

      } else {

        console.log("etape actuelle : ", this.currentStep);
        this.currentStep = step;
      }
    }
  }
  }

