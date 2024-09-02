import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../entreprise.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-entreprise',
  standalone: true,
  imports: [NgFor],
  templateUrl: './entreprise.component.html',
  styleUrl: './entreprise.component.css'
})

export class EntrepriseComponent implements OnInit {

  entreprises: any[] = [];

  constructor (private entrepriseService: EntrepriseService) {}

  ngOnInit(): void {
    
    this.entrepriseService.getEntreprises().subscribe(
      (data:any[]) => {
        this.entreprises = data;
        console.log(this.entreprises);
      }
    )
  }

}
