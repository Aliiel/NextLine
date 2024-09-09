import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  private token: string | null = null;
  private tokenValid: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  setToken(token: string) {
    this.token = token;
    console.log('token dans le tokenService : ', token);
  }

  getToken(): string | null {
    return this.token;
  }

  isTokenValid(): boolean {
    return !!this.token; 
  }

  verifyToken(token: string): void {

    this.http.get<boolean>(`http://localhost:8081/api-nextline/liens-formulaires/verify-token?token=${token}`)
      .subscribe({
        next: (isValid) => {

          this.tokenValid = isValid;

          if (!isValid) {

            this.router.navigate(['/error']); // Rediriger si le token est invalide
          }
        },
        error: () => {

          this.router.navigate(['/error']); // Rediriger en cas d'erreur de l'API
        }
      });
  }
}