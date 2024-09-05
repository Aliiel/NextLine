import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private apiURL = "http://localhost:8081/api-nextline/entreprises";
  private entrepriseData: any = null;

  constructor(private http: HttpClient) { }

  getEntreprises(): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL);
  }

  checkEntreprise(token: string, siret: string): Observable<any> {
    return this.http.get(`${this.apiURL}/verifier/${token}/${siret}`);
  }

  setEntrepriseData(data: any): void {
    this.entrepriseData = data;
  }

  getEntrepriseData (): any {
    return this.entrepriseData;
  }

  getFormesJuridiques(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8081/api-nextline/formes-juridiques');
  }

  getDirigeants(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8081/api-nextline/dirigeants');
  }

  getAssurances(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8081/api-nextline/assurances');
  }

  getFonctions(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8081/api-nextline/fonctions');
  }

  addFormeJuridique(formeJuridique: { nomFormeJuridique: string }): Observable<any> {

    return this.http.post<any>('http://localhost:8081/api-nextline/formes-juridiques', formeJuridique);
  }

  addAssurance( assurance: { nomAssurance: string, numeroSocietaire: string }): Observable<any> {

    return this.http.post<any>('http://localhost:8081/api-nextline/assurances', assurance);
  }

  addDirigeant ( dirigeant : { nomDirigeant: string, prenomDirigeant: string, emailDirigeant: string }) : Observable<any> {

    return this.http.post<any>('http://localhost:8081/api-nextline/dirigeants', dirigeant);
  }


}


