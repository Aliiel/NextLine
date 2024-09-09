import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormulaireSiretComponent } from './formulaire-siret/formulaire-siret.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { FormulaireEntrepriseComponent } from './formulaire-entreprise/formulaire-entreprise.component';
import { FormulaireHorairesStageComponent } from './formulaire-horaires-stage/formulaire-horaires-stage.component';
import { ErreurComponent } from './erreur/erreur.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'formulaire-siret', component: FormulaireSiretComponent},
    { path: 'formulaire-entreprise', component: FormulaireEntrepriseComponent},
    { path: 'formulaire', component: FormulaireComponent},
    { path: 'formulaire-horaires-stage', component: FormulaireHorairesStageComponent},
    { path: 'error', component: ErreurComponent },
    { path: '**', redirectTo: 'error' }
];
