import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TokenService } from '../Services/token.service';

@Component({
  selector: 'app-formulaire-horaires-stage',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor, FormsModule],
  templateUrl: './formulaire-horaires-stage.component.html',
  styleUrl: './formulaire-horaires-stage.component.css'
})
export class FormulaireHorairesStageComponent {

  horairesForm: FormGroup;
  stages: any[] = [];
  jours: any[] = [];
  token: string | null = '';

  constructor
  ( private fb: FormBuilder,
    protected tokenService: TokenService,
    private router: Router
  ) {
    this.horairesForm = this.fb.group({
      heureDebut: ['', Validators.required],
      heureDebutPauseDej: [''],
      heureFinPauseDej: [''],
      heureFin: ['', Validators.required],
      stage: ['', Validators.required],
      jour: ['', Validators.required]
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
  }

  onSubmit(): void {

    
  }
}
