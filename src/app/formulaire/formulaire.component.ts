import { Component } from '@angular/core';
import { EntrepriseService } from '../entreprise.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [NgIf],
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css'
})
export class FormulaireComponent {

  entreprise: any;

  constructor(private entrepriseService: EntrepriseService) { }

  ngOnInit(): void {
    this.entreprise = this.entrepriseService.getEntrepriseData();  // Récupère les données stockées
  }

}
