import { Component } from '@angular/core';
import { TokenService } from '../Services/token.service';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [NgIf],
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css'
})
export class FormulaireComponent {

  token: string | null = '';

  constructor
  (
    private fb: FormBuilder,
    private tokenService: TokenService,
    private router: Router
  ) {}

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

}
