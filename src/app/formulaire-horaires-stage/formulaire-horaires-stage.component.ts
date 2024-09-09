import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../Services/token.service';

@Component({
  selector: 'app-formulaire-horaires-stage',
  standalone: true,
  imports: [],
  templateUrl: './formulaire-horaires-stage.component.html',
  styleUrl: './formulaire-horaires-stage.component.css'
})
export class FormulaireHorairesStageComponent {

  token: string | null = '';

  constructor
  ( protected tokenService: TokenService,
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
