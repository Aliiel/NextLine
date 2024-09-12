import { Component, OnInit } from '@angular/core';
import { TokenService } from '../Services/token.service';
import { EntrepriseService } from '../Services/entreprise.service';
import { FonctionDTO } from '../Models/fonctionDTO.model';
import { EntrepriseDTO } from '../Models/entrepriseDTO.model';
import { TuteurDTO } from '../Models/tuteurDTO.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-formulaire-tuteur',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor],
  templateUrl: './formulaire-tuteur.component.html',
  styleUrl: './formulaire-tuteur.component.css'
})
export class FormulaireTuteurComponent {

  token: string | null = '';
  tuteurForm: FormGroup;
  nomFonction: string = ''; 
  fonctionDTO: FonctionDTO | null = null;
  entrepriseDTO: EntrepriseDTO | null = null;
  tuteurDTO: TuteurDTO | null = null;
  fonctions: any[] = [];
  selectedFonctionId: number | null = null; 


  constructor
  (
    private fb: FormBuilder,
    private tokenService: TokenService,
    private entrepriseService: EntrepriseService,
    private router: Router
  ) {
    this.tuteurForm = this.fb.group({
    nomTuteur: ['', Validators.required],
    prenomTuteur: ['', Validators.required],
    emailTuteur: ['', [Validators.required, Validators.email]],
    telTuteur: ['', Validators.required],
    entreprise: [''],
    fonction: ['']
  });}

  ngOnInit(): void {

    /* 
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
      */

    this.entrepriseService.getFonctions().subscribe((data) => {

      console.log('Fonctions récupérées :', data);
      this.fonctions = data;
    });

    
  }

  onSubmit() {

    if (this.tuteurForm.valid) {

      const entrepriseDTO = this.entrepriseService.getEntrepriseData();

      console.log("entreprise récupérée : ", entrepriseDTO);

      const fonctionDTO = this.fonctionDTO || new FonctionDTO(0, 'Aucune fonction');

      console.log("fonctionDTO : ", fonctionDTO);
      
      const tuteurDTO = new TuteurDTO(
        this.tuteurForm.get('nomTuteur')?.value,
        this.tuteurForm.get('prenomTuteur')?.value,
        this.tuteurForm.get('emailTuteur')?.value,
        this.tuteurForm.get('telTuteur')?.value,
        entrepriseDTO, 
        fonctionDTO 
      );

      console.log("Tuteur hydraté : ", tuteurDTO); 

      if (tuteurDTO) {

        // Persist le tuteurDTO en appelant l'API ou une autre méthode
        this.entrepriseService.saveTuteur(tuteurDTO).subscribe(response => {
          console.log('Tuteur sauvegardé :', response);
        });
      }
    }
  }

  saveNewFonction(): void {

    if (this.nomFonction) {

      this.entrepriseService.addFonction({ nomFonction: this.nomFonction }).subscribe((fonction) => {

        if (fonction && fonction.id) {
          // Ajouter la nouvelle forme à la liste
          this.fonctions.push(fonction);
          this.selectedFonctionId = fonction.id;
  
          // Mettre à jour le formulaire
          this.tuteurForm.get('fonctionDTO')?.patchValue(fonction.id);
          console.log("nom fonction : ", fonction.nomFonction);
          console.log("id fonction : ", fonction.id);
  
          // Récupérer l'objet FormeJuridiqueDTO complet pour associer à l'objet entreprise
          this.entrepriseService.getFonctionById(fonction.id).subscribe((fonctionData) => {

            this.fonctionDTO = new FonctionDTO (

              fonctionData.id,
              fonctionData.nomFonction
            );
  
            if (this.tuteurDTO) {

              console.log("tuteur : ", this.tuteurDTO);

              this.tuteurDTO.fonctionDTO = this.fonctionDTO;

              this.tuteurForm.patchValue({

                fonction: this.fonctionDTO.nomFonction
              });

              console.log('tuteur avec nouvelle fonction : ', this.tuteurDTO)
            }
  
            console.log('Fonction créée et associée :', this.fonctionDTO);
          });
        }
  
        this.closeModal('fonctionModal');
      });
    }
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


}
