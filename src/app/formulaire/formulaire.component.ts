import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [],
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css'
})
export class FormulaireComponent {

  private apiUrl = 'http://localhost:8081/api-nextline/villes'; 

  constructor (private http: HttpClient) {}

  goFormulaire(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl);
  }

}
