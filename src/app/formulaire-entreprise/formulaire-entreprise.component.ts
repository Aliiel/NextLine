import { Component } from '@angular/core';
import { EntrepriseService } from '../entreprise.service';
import { NgIf, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulaire-entreprise',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor],
  templateUrl: './formulaire-entreprise.component.html',
  styleUrl: './formulaire-entreprise.component.css'
})
export class FormulaireEntrepriseComponent {

  entrepriseForm: FormGroup;
  formesJuridiques: any[] = [];
  assurances: any[] = [];

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
  }

  onSubmit(): void {

    if (this.entrepriseForm.valid) {

      this.entrepriseService.setEntrepriseData(this.entrepriseForm.value);

      this.router.navigate(['/next-step']); // Rediriger vers la prochaine étape du formulaire
    }
  }

  addNewFormeJuridique(): void {

    const nomFormeJuridique = prompt('Entrez la nouvelle forme juridique :');

    if (nomFormeJuridique) {

      this.entrepriseService.addFormeJuridique({ nomFormeJuridique: nomFormeJuridique }).subscribe((formeJuridique) => {
        this.formesJuridiques.push(formeJuridique); // Met à jour la liste des formes juridiques
        this.entrepriseForm.get('formeJuridique')?.setValue(formeJuridique.id); // Sélectionne la nouvelle forme
      });
    }
  }

  addNewAssurance(): void {

    const nomAssurance = prompt('Entrez le nom de l\'assurance :');

    if (nomAssurance) {

    const numeroSocietaire = prompt('Entrez le numéro sociétaire :');

    if (numeroSocietaire) {

      // On passe les deux valeurs à la méthode addAssurance
      this.entrepriseService.addAssurance({ nomAssurance: nomAssurance, numeroSocietaire: numeroSocietaire }).subscribe((assurance) => {

        this.assurances.push(assurance); // Met à jour la liste des assurances
        this.entrepriseForm.get('assurance')?.setValue(assurance.id); // Sélectionne la nouvelle assurance
      });
    }
  }
  }
}
