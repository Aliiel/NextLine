import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private apiURL = "http://localhost:8081/api-nextline/entreprises"

  constructor(private http: HttpClient) { }

  getEntreprises(): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL);
  }
}


