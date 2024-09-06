import { Component } from '@angular/core';
import { EntrepriseService } from '../entreprise.service';
import { NgIf, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormeJuridiqueDTO } from '../Models/forme-juridiqueDTO.model';
import { AssuranceDTO } from '../Models/assuranceDTO.model';
import { DirigeantDTO } from '../Models/dirigeantDTO.model';
import { VilleDTO } from '../Models/villeDTO.model';
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
  selectedDirigeantId: number | null = null; 
  selectedFormeJuridiqueId: number | null = null; 
  selectedAssuranceId: number | null = null; 
  numeroSiret: string | null = null;
  formeJuridiqueDTO?: FormeJuridiqueDTO;
  assuranceDTO?: AssuranceDTO;
  dirigeantDTO?: DirigeantDTO;
  villeDTO?: VilleDTO;

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

    this.numeroSiret = entrepriseData.numeroSiret;

    console.log('numéro siret : ', this.numeroSiret)

    if (entrepriseData) {
      this.entrepriseForm.patchValue({
        raisonSociale: entrepriseData.raisonSociale,
        adresseEntreprise: entrepriseData.adresseEntreprise,
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

      const codePostal = this.entrepriseForm.get('ville.codePostal')?.value;
      const codeInsee = this.entrepriseForm.get('ville.codeInsee')?.value;
      

      this.entrepriseService.getVilleByCodePostalAndCodeInsee(codePostal, codeInsee).subscribe((ville) => {
        this.villeDTO = new VilleDTO (ville.codePostal, ville.codeInsee, ville.nomVille)
      })

      const entreprise = {
        adresseEntreprise: this.entrepriseForm.get('adresseEntreprise')?.value,
        assuranceDTO: this.assuranceDTO,
        dirigeantDTO: this.dirigeantDTO,
        formeJuridiqueDTO: this.formeJuridiqueDTO,
        numeroSiret: this.numeroSiret,
        raisonSociale: this.entrepriseForm.get('raisonSociale')?.value,
        telephoneEntreprise: this.entrepriseForm.get('telephoneEntreprise')?.value,
        emailEntreprise: this.entrepriseForm.get('emailEntreprise')?.value,
        ville: this.villeDTO
      };

      console.log('Entreprise à enregistrer :', entreprise);

      this.entrepriseService.saveEntreprise(entreprise).subscribe({
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

        if (formeJuridique && formeJuridique.id) {

          this.formesJuridiques.push(formeJuridique);  // Ajoute la nouvelle forme à la liste
          this.selectedFormeJuridiqueId = formeJuridique.id;  // Récupère l'ID de la forme juridique créée
          this.entrepriseForm.get('formeJuridique')?.setValue(formeJuridique.id);  // Affecte l'ID au champ du formulaire
  
          console.log('Forme juridique créée avec ID :', formeJuridique.id);
  
          // Récupérer l'objet complet à partir de l'ID
          this.entrepriseService.getFormeJuridiqueById(formeJuridique.id).subscribe((formeJuridique) => {

            this.formeJuridiqueDTO = new FormeJuridiqueDTO(formeJuridique.id, formeJuridique.nomFormeJuridique);
            
            console.log('Objet FormeJuridiqueDTO hydraté :', this.formeJuridiqueDTO);
            
            // Vous pouvez maintenant utiliser l'objet hydraté comme vous le souhaitez
          });
        }
  
        this.closeModal('formeJuridiqueModal');  // Ferme le modal
      });
    }
  }

  saveNewAssurance(): void {

    const newAssurance = {

      nomAssurance: this.nomAssurance,
      numeroSocietaire: this.numeroSocietaire
    };
  
    this.entrepriseService.addAssurance(newAssurance).subscribe((assurance) => {
      if (assurance && assurance.id) {
        this.assurances.push(assurance);  // Ajoute la nouvelle assurance à la liste
        this.selectedAssuranceId = assurance.id;  // Récupère l'ID de l'assurance créée
  
        // Récupérer l'objet complet AssuranceDTO à partir de l'ID
        this.entrepriseService.getAssuranceById(this.selectedAssuranceId).subscribe((assuranceData) => {
          this.assuranceDTO = new AssuranceDTO(assuranceData.id, assuranceData.nomAssurance, assuranceData.numeroSocietaire);
          console.log('Objet FormeJuridiqueDTO hydraté :', this.assuranceDTO);
       
        });
  
        this.entrepriseForm.get('assurance')?.setValue({
          nomAssurance: assurance.nomAssurance,
          numeroSocietaire: assurance.numeroSocietaire
        });
  
        console.log('Assurance créée avec ID :', assurance.id);
      }
  
      this.closeModal('assuranceModal');  // Ferme le modal
    });
}

saveNewDirigeant(): void {

  const newDirigeant = {
    nomDirigeant: this.nomDirigeant,
    prenomDirigeant: this.prenomDirigeant,
    emailDirigeant: this.emailDirigeant,
  };

  this.entrepriseService.addDirigeant(newDirigeant).subscribe((dirigeant) => {
    if (dirigeant && dirigeant.id) {
      this.dirigeants.push(dirigeant);  // Ajoute le nouveau dirigeant à la liste
      this.selectedDirigeantId = dirigeant.id;  // Récupère l'ID du dirigeant créé

      // Récupérer l'objet complet DirigeantDTO à partir de l'ID
      this.entrepriseService.getDirigeantById(this.selectedDirigeantId).subscribe((dirigeantData) => {
        this.dirigeantDTO = new DirigeantDTO(dirigeantData.id, dirigeantData.nomDirigeant, dirigeantData.prenomDirigeant, dirigeantData.emailDirigeant);
        
        console.log('dirigeantDTO hydraté : ', this.dirigeantDTO)
      });

      this.entrepriseForm.get('dirigeant')?.setValue({
        nomDirigeant: dirigeant.nomDirigeant,
        prenomDirigeant: dirigeant.prenomDirigeant,
        emailDirigeant: dirigeant.emailDirigeant,
      });

      console.log('Dirigeant créé avec ID :', dirigeant.id);
    }

    this.closeModal('dirigeantModal');  // Ferme le modal
  });
}
}
