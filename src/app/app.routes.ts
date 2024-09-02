import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';

export const routes: Routes = [
    { path: '', component: LayoutComponent },
    { path: 'entreprises', component: EntrepriseComponent }
];
