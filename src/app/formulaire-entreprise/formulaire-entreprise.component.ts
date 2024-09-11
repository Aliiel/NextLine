import { Component } from '@angular/core';
import { EntrepriseService } from '../Services/entreprise.service';
import { TokenService } from '../Services/token.service';
import { NgIf, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormeJuridiqueDTO } from '../Models/forme-juridiqueDTO.model';
import { AssuranceDTO } from '../Models/assuranceDTO.model';
import { DirigeantDTO } from '../Models/dirigeantDTO.model';
import { VilleDTO } from '../Models/villeDTO.model';
import { EntrepriseDTO } from '../Models/entrepriseDTO.model';
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
  selectedFormeJuridiqueId: number | null = null; 
  formeJuridiqueDTO: FormeJuridiqueDTO| null = null;
  assuranceDTO: AssuranceDTO | null = null;
  dirigeantDTO: DirigeantDTO | null = null;
  villeDTO: VilleDTO | null = null;
  entrepriseDTO: EntrepriseDTO | null = null;
  token: string | null = '';


  constructor
  (
    private fb: FormBuilder,
    private entrepriseService: EntrepriseService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.entrepriseForm = this.fb.group({
      raisonSociale: ['', Validators.required],
      adresseEntreprise: ['', Validators.required],
      numeroSiret: [''],
      telephoneEntreprise: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      emailEntreprise: ['', Validators.required],
      ville: this.fb.group({
        nomVille: ['', Validators.required],
        codePostal: ['', Validators.required]
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

    const token = this.tokenService.getToken();

    console.log('token récupéré depuis le service token : ', token);

    if (token) {

      this.token = token;
      this.tokenService.setToken(token);
      this.tokenService.verifyToken(token);

      console.log('token vérifié : ', token);

    } else {
      
      this.router.navigate(['/error']);
    }

    const entrepriseData = this.entrepriseService.getEntrepriseData();

    if (entrepriseData) {
      
      this.entrepriseDTO = new EntrepriseDTO (

        entrepriseData.raisonSociale,
        entrepriseData.adresseEntreprise,
        entrepriseData.telephoneEntreprise,
        entrepriseData.emailEntreprise,
        entrepriseData.numeroSiret,
        new VilleDTO(
          entrepriseData.villeDTO.id,
          entrepriseData.villeDTO.codePostal,
          entrepriseData.villeDTO.codeInsee,
          entrepriseData.villeDTO.nomVille
        ),
        new FormeJuridiqueDTO(
          entrepriseData.formeJuridiqueDTO.id,
          entrepriseData.formeJuridiqueDTO.nomFormeJuridique
        ),
        new DirigeantDTO(
          entrepriseData.dirigeantDTO.id,
          entrepriseData.dirigeantDTO.nomDirigeant,
          entrepriseData.dirigeantDTO.prenomDirigeant,
          entrepriseData.dirigeantDTO.emailDirigeant
        ),
        new AssuranceDTO(
          entrepriseData.assuranceDTO.id,
          entrepriseData.assuranceDTO.nomAssurance,
          entrepriseData.assuranceDTO.numeroSocietaire
        )
      );
    }

    console.log('entreprise récupérée et hydratée : ', this.entrepriseDTO);

    console.log('numéro siret : ', this.entrepriseDTO?.numeroSiret)

    if (this.entrepriseDTO) {
      this.entrepriseForm.patchValue({

        raisonSociale: this.entrepriseDTO.raisonSociale,
        adresseEntreprise: this.entrepriseDTO.adresseEntreprise,
        ville: {
          nomVille: this.entrepriseDTO.villeDTO.nomVille,
          codePostal: this.entrepriseDTO.villeDTO.codePostal
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

    if (this.entrepriseDTO) {
      // Mettre à jour les propriétés de l'objet entrepriseDTO avec les données du formulaire
      this.entrepriseDTO.raisonSociale = this.entrepriseForm.get('raisonSociale')?.value;
      this.entrepriseDTO.adresseEntreprise = this.entrepriseForm.get('adresseEntreprise')?.value;
      this.entrepriseDTO.telephoneEntreprise = this.entrepriseForm.get('telephoneEntreprise')?.value;
      this.entrepriseDTO.emailEntreprise = this.entrepriseForm.get('emailEntreprise')?.value;
    }

    // Obtenir la valeur sélectionnée du formulaire
    const formeJuridiqueId = this.entrepriseForm.get('formeJuridique')?.value;
  
    if (formeJuridiqueId) {

      // Rechercher l'objet FormeJuridiqueDTO correspondant à l'ID sélectionné
      this.entrepriseService.getFormeJuridiqueById(formeJuridiqueId).subscribe((formeJuridiqueData) => {
        this.formeJuridiqueDTO = new FormeJuridiqueDTO(
          formeJuridiqueData.id,
          formeJuridiqueData.nomFormeJuridique
        );
  
        // Associer la forme juridique à l'objet entreprise
        if (this.entrepriseDTO) {

          this.entrepriseDTO.formeJuridiqueDTO = this.formeJuridiqueDTO;
        }
  
        // Persist le reste des données de l'entreprise
        this.entrepriseService.saveEntreprise(this.entrepriseDTO).subscribe(response => {
          console.log('Entreprise sauvegardée :', response);
        });
      });
    }

    if (this.entrepriseForm.valid) {

    this.router.navigate(['/formulaire']); 
  }
}


  saveNewFormeJuridique(): void {

    if (this.nomFormeJuridique) {

      this.entrepriseService.addFormeJuridique({ nomFormeJuridique: this.nomFormeJuridique }).subscribe((formeJuridique) => {

        if (formeJuridique && formeJuridique.id) {
          // Ajouter la nouvelle forme à la liste
          this.formesJuridiques.push(formeJuridique);
          this.selectedFormeJuridiqueId = formeJuridique.id;
  
          // Mettre à jour le formulaire
          this.entrepriseForm.get('formeJuridique')?.patchValue(formeJuridique.id);
  
          // Récupérer l'objet FormeJuridiqueDTO complet pour associer à l'objet entreprise
          this.entrepriseService.getFormeJuridiqueById(formeJuridique.id).subscribe((formeJuridiqueData) => {

            this.formeJuridiqueDTO = new FormeJuridiqueDTO(

              formeJuridiqueData.id,
              formeJuridiqueData.nomFormeJuridique
            );
  
            if (this.entrepriseDTO) {

              this.entrepriseDTO.formeJuridiqueDTO = this.formeJuridiqueDTO;

              this.entrepriseForm.patchValue({

                formeJuridique: this.formeJuridiqueDTO.nomFormeJuridique
              });

              console.log('entreprise avec nouvelle forme juridique : ', this.entrepriseDTO)
            }
  
            console.log('Forme juridique créée et associée :', this.formeJuridiqueDTO);
          });
        }
  
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
  
        // Récupérer l'objet AssuranceDTO complet
        this.entrepriseService.getAssuranceById(assurance.id).subscribe((assuranceData) => {

          this.assuranceDTO = new AssuranceDTO(

            assuranceData.id,
            assuranceData.nomAssurance,
            assuranceData.numeroSocietaire
          );
  
          // Associer à l'objet entreprise
          if (this.entrepriseDTO) {
            
            this.entrepriseDTO.assuranceDTO = this.assuranceDTO;

            console.log('objet entreprise avec la nouvelle assurance : ', this.entrepriseDTO)
          }
  
          // Mettre à jour le formulaire
          this.entrepriseForm.patchValue({

            assurance: {

              nomAssurance: this.assuranceDTO.nomAssurance,
              numeroSocietaire: this.assuranceDTO.numeroSocietaire
            }

            
          });
  
          console.log('Assurance créée et associée :', this.assuranceDTO);
        });
  
      this.closeModal('assuranceModal');
    });
  }

  saveNewDirigeant(): void {

    const newDirigeant = {
      nomDirigeant: this.nomDirigeant,
      prenomDirigeant: this.prenomDirigeant,
      emailDirigeant: this.emailDirigeant
    };
  
    this.entrepriseService.addDirigeant(newDirigeant).subscribe((dirigeant) => {
  
        // Récupérer l'objet DirigeantDTO complet
        this.entrepriseService.getDirigeantById(dirigeant.id).subscribe((dirigeantData) => {

          this.dirigeantDTO = new DirigeantDTO(

            dirigeantData.id,
            dirigeantData.nomDirigeant,
            dirigeantData.prenomDirigeant,
            dirigeantData.emailDirigeant
          );
  
          // Associer à l'objet entreprise
          if (this.entrepriseDTO) {

            this.entrepriseDTO.dirigeantDTO = this.dirigeantDTO;
         
            console.log('entreprise avec le dirigeant saisi : ', this.entrepriseDTO)
          }

          this.entrepriseForm.patchValue({

            dirigeant: {

              nomDirigeant: this.dirigeantDTO.nomDirigeant,
              prenomDirigeant: this.dirigeantDTO.prenomDirigeant,
              emailDirigeant: this.dirigeantDTO.emailDirigeant
            }
          });
  
        
  
          console.log('Dirigeant créé et associé :', this.dirigeantDTO);
        });

      this.closeModal('dirigeantModal');
    });
  }

}
