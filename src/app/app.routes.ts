import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { FormulaireSiretComponent } from './formulaire-siret/formulaire-siret.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { FormulaireEntrepriseComponent } from './formulaire-entreprise/formulaire-entreprise.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'entreprises', component: EntrepriseComponent },
    { path: 'formulaire-siret', component: FormulaireSiretComponent},
    { path: 'formulaire-entreprise', component: FormulaireEntrepriseComponent},
    { path: 'formulaire', component: FormulaireComponent}
];
