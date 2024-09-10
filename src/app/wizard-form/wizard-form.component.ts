import { Component, Input, ViewChild } from '@angular/core';
import { FormulaireEntrepriseComponent } from '../formulaire-entreprise/formulaire-entreprise.component';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wizard-form',
  standalone: true,
  imports: [FormulaireEntrepriseComponent, NgIf],
  templateUrl: './wizard-form.component.html',
  styleUrl: './wizard-form.component.css'
})
export class WizardFormComponent {

  @Input() currentStep: number = 1;
  totalSteps: number = 3; 

  @ViewChild(FormulaireEntrepriseComponent) formulaireEntrepriseComponent!: FormulaireEntrepriseComponent;

  goToStep(step: number): void {

    if (step >= 1 && step <= this.totalSteps) {

      if (step > this.currentStep) {

        this.currentStep++;

        } else {

          this.currentStep = step;
        }
      }
    }
  }

