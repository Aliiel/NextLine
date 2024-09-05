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
  nomDirigeant: string = '';
  prenomDirigeant: string = '';
  emailDirigeant: string = '';
  dirigeants: any[] = [];

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
        formeJuridique: entrepriseData.formeJuridiqueDTO.nomFormeJuridique,
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

      const entrepriseData = this.entrepriseForm.value;

      console.log('entreprise fournie : ', this.entrepriseForm.value);

      const adaptedEntrepriseData = {
        raisonSociale: entrepriseData.raisonSociale,
        adresseEntreprise: entrepriseData.adresseEntreprise,
        numeroSiret: entrepriseData.numeroSiret,
        telephoneEntreprise: entrepriseData.telephoneEntreprise,
        emailEntreprise: entrepriseData.emailEntreprise,
        villeDTO: entrepriseData.ville,
        formeJuridiqueDTO: { id: entrepriseData.formeJuridique },
        dirigeantDTO: entrepriseData.dirigeant,
        assuranceDTO: entrepriseData.assurance,
      };

      this.entrepriseService.setEntrepriseData(adaptedEntrepriseData);

      console.log('entreprise à enregistrer : ', adaptedEntrepriseData);

      this.entrepriseService.saveEntreprise(adaptedEntrepriseData).subscribe({

        next: (response) => {

          console.log('Entreprise créée avec succès :', response);
          this.router.navigate(['/next-step']); // Rediriger vers la prochaine étape du formulaire
        },

        error: (err) => {

          console.error('Erreur lors de la création de l\'entreprise :', err);
        }
      });
    }
  }


  saveNewFormeJuridique(): void {

    if (this.nomFormeJuridique) {

      this.entrepriseService.addFormeJuridique({ nomFormeJuridique: this.nomFormeJuridique }).subscribe((formeJuridique) => {
        
        this.formesJuridiques.push(formeJuridique); 
        this.entrepriseForm.get('formeJuridique')?.setValue(formeJuridique.id); 
        console.log('Set la forme juridique : ', formeJuridique.nomFormeJuridique);

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
        
    this.assurances.push(assurance); 
    this.entrepriseForm.get('assurance')?.setValue({
      
      nomAssurance: assurance.nomAssurance,
      numeroSocietaire: assurance.numeroSocietaire
    });

    console.log('set nom assurance : ', this.nomAssurance);
    console.log('set num sociétaire : ', this.numeroSocietaire);
    this.closeModal('assuranceModal');
        
    });
  }

  saveNewDirigeant(): void {

    const newDirigeant = {

      nomDirigeant: this.nomDirigeant,
      prenomDirigeant: this.prenomDirigeant,
      emailDirigeant: this.emailDirigeant,
    };

  this.entrepriseService.addDirigeant(newDirigeant).subscribe((dirigeant) => {
        
    this.dirigeants.push(dirigeant);
    this.entrepriseForm.get('dirigeant')?.setValue({
      
      nomDirigeant: dirigeant.nomDirigeant,
      prenomDirigeant: dirigeant.prenomDirigeant,
      emailDirigeant: dirigeant.emailDirigeant,
    });

    console.log('set nom dirigeant : ', this.nomDirigeant);
    console.log('set prenom : ', this.prenomDirigeant);
    console.log('set email : ', this.emailDirigeant);

    this.closeModal('dirigeantModal');

    });
  }
}
