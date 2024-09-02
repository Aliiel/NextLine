import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { FormulaireSiretComponent } from './formulaire-siret/formulaire-siret.component';
import { FormulaireComponent } from './formulaire/formulaire.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'entreprises', component: EntrepriseComponent },
    { path: 'formulaire-siret', component: FormulaireSiretComponent},
    { path: 'formulaire', component: FormulaireComponent}
];
