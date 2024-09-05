import { Component } from '@angular/core';
import { EntrepriseService } from '../entreprise.service';
import { NgIf, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-formulaire-entreprise',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor, FormsModule],
  templateUrl: './formulaire-entreprise.component.html',
  styleUrl: './formulaire-entreprise.component.css'
})
export class FormulaireEntrepriseComponent {

  entrepriseForm: FormGroup;
  formesJuridiques: any[] = [];
  nomFormeJuridique: string = '';
  assurances: any[] = [];
  nomAssurance: string = '';
  numeroSocietaire: string = '';
  fonctions: any[] = [];
  nomDirigeant: string = '';
  prenomDirigeant: string = '';
  emailDirigeant: string = '';
  nomFonction: string = '';

  constructor(
    private fb: FormBuilder,
    private entrepriseService: EntrepriseService,
    private router: Router
  ) {
    this.entrepriseForm = this.fb.group({
      raisonSociale: [''],
      adresseEntreprise: [''],
      numeroSiret: [''],
      telephoneEntreprise: [''],
      emailEntreprise: [''],
      ville: this.fb.group({
        nomVille: [''],
        codePostal: ['']
      }),
      formeJuridique: [''],
      dirigeant: this.fb.group({
        nomDirigeant: [''],
        prenomDirigeant: [''],
        emailDirigeant: [''],
        fonction: ['']
      }),
      assurance: this.fb.group({
        nomAssurance: [''],
        numeroSocietaire: ['']
      })
    });
  }

  ngOnInit(): void {
    // Si les données existent déjà, pré-remplir le formulaire
    const entrepriseData = this.entrepriseService.getEntrepriseData();

    if (entrepriseData) {
      this.entrepriseForm.patchValue({
        raisonSociale: entrepriseData.raisonSociale,
        adresseEntreprise: entrepriseData.adresseEntreprise,
        numeroSiret: entrepriseData.numeroSiret,
        telephoneEntreprise: entrepriseData.telephoneEntreprise,
        emailEntreprise: entrepriseData.emailEntreprise,
        formeJuridique: entrepriseData.formeJuridiqueDTO.nomFormeJuridique,
        dirigeant: {
          nomDirigeant: entrepriseData.dirigeantDTO.nomDirigeant,
          prenomDirigeant: entrepriseData.dirigeantDTO.prenomDirigeant,
          emailDirigeant: entrepriseData.dirigeantDTO.emailDirigeant,
          fonction: entrepriseData.dirigeantDTO.fonctionDTO.nomFonction
        },
        assurance: {
          nomAssurance: entrepriseData.assuranceDTO.nomAssurance,
          numeroSocietaire: entrepriseData.assuranceDTO.numeroSocietaire
        },
        ville: {
          nomVille: entrepriseData.villeDTO.nomVille,
          codePostal: entrepriseData.villeDTO.codePostal
        }
      });
    }

    this.entrepriseService.getFormesJuridiques().subscribe((data) => {

      console.log('Formes juridiques récupérées :', data);
      this.formesJuridiques = data;
    });

    this.entrepriseService.getAssurances().subscribe((data) => {

      console.log('Assurances récupérées :', data);
      this.assurances = data;
    });

    this.entrepriseService.getFonctions().subscribe((data) => {

      console.log('Fonctions récupérées :', data);
      this.fonctions = data;
    });
  }


  openModal(modalId: string): void {

    const modalElement = document.getElementById(modalId);

    if (modalElement) {

      const modal = new bootstrap.Modal(modalElement);
      modal.show();

    } else {

      console.error('Modale non trouvée :', modalId);
    }
  }

  closeModal(modalId: string): void {

    const modalElement = document.getElementById(modalId);

    if (modalElement) {

      const modal = bootstrap.Modal.getInstance(modalElement);

      if (modal) {

        modal.hide();
      }
    }
  }
  

  onSubmit(): void {

    if (this.entrepriseForm.valid) {

      this.entrepriseService.setEntrepriseData(this.entrepriseForm.value);

      this.router.navigate(['/next-step']); // Rediriger vers la prochaine étape du formulaire
    }
  }

  saveNewFormeJuridique(): void {

    if (this.nomFormeJuridique) {

      this.entrepriseService.addFormeJuridique({ nomFormeJuridique: this.nomFormeJuridique }).subscribe((formeJuridique) => {
        
        this.formesJuridiques.push(formeJuridique); // Met à jour la liste des formes juridiques
        this.entrepriseForm.get('formeJuridique')?.setValue(formeJuridique.id); // Sélectionne la nouvelle forme

        this.closeModal('formeJuridiqueModal');
    });
  }
}

  saveNewAssurance(): void {

    const newAssurance = {

      nomAssurance: this.nomAssurance,
      numeroSocietaire: this.numeroSocietaire
    };

  this.entrepriseService.addAssurance(newAssurance).subscribe((assurance) => {
        
    this.assurances.push(assurance); // Met à jour la liste des assurances
    this.entrepriseForm.get('assurance')?.setValue({
      
      nomAssurance: assurance.nomAssurance,
      numeroSocietaire: assurance.numeroSocietaire
    });

    this.closeModal('assuranceModal');
        
    });
  }

  saveNewDirigeant(): void {

    const newDirigeant = {

      nomDirigeant: this.nomDirigeant,
      prenomDirigeant: this.prenomDirigeant,
      emailDirigeant: this.emailDirigeant,
      nomFonction: this.nomFonction
    };

  this.entrepriseService.addDirigeant(newDirigeant).subscribe((dirigeant) => {
        
    this.entrepriseForm.get('dirigeant')?.setValue({
      
      nomDirigeant: dirigeant.nomDirigeant,
      prenomDirigeant: dirigeant.prenomDirigeant,
      emailDirigeant: dirigeant.emailDirigeant,
      nomFonction: dirigeant.nomFonction
    });

    this.closeModal('dirigeantModal');
        
    });
  }
}
