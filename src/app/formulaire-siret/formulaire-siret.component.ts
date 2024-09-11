import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { EntrepriseService } from '../Services/entreprise.service';
import { TokenService } from '../Services/token.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
declare var window: any; 

@Component({
  selector: 'app-formulaire-siret',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, RouterModule],
  templateUrl: './formulaire-siret.component.html',
  styleUrl: './formulaire-siret.component.css'
})
export class FormulaireSiretComponent {

  siretForm: FormGroup;
  entreprise: any = "";
  raisonSociale: String = "";
  token: string | null = '';
  modal: any;

  constructor
  (private fb: FormBuilder,
    protected entrepriseService: EntrepriseService,
    protected tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Crée le formulaire avec un contrôle pour le numéro SIRET
    this.siretForm = this.fb.group({
      siret: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]]
    });
  }

  ngOnInit(): void {
    // Récupérer le token depuis l'URL
    this.route.queryParams.subscribe(params => {
      const token = params['token'] || '';

      console.log('token recup depuis l\'url :', token);
  
      if (token) {

        this.token = token;
        this.tokenService.setToken(token);
        this.tokenService.verifyToken(token);

        console.log('token vérifié : ', token);

      } else {
        
        this.router.navigate(['/error']);
      }
    });

    this.modal = new window.bootstrap.Modal(document.getElementById('siretNotFoundModal'));
  }

  get siret() {

    return this.siretForm.get('siret');
  }

   // Méthode pour gérer la soumission du formulaire
   onSubmit(): void {

    if (this.siretForm.valid) {

      console.log('Numéro SIRET soumis :', this.siretForm.value.siret);
      const siret = this.siretForm.value.siret;

      if (this.token) {

        console.log('token : ', this.token);
        console.log('Numéro siret : ', siret)

        this.entrepriseService.checkEntreprise(this.token, siret).subscribe(

          (data) => {
  
            console.log('Entreprise trouvée : ', data);
            this.entrepriseService.setEntrepriseData(data);
            this.router.navigate(['/wizard-form']);
          },
  
          (error) => {
  
            console.error('L\'entreprise n\'est pas répertoriée', error);
            this.openSiretNotFoundModal();
          }
        );
      }
    }
  }

  openSiretNotFoundModal(): void {
    this.modal.show();  
  }
}
