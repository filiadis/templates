import { Routes } from '@angular/router';
import { App1Component } from './pages/app1/app1.component';
import { GuidelinesComponent } from './pages/guidelines/guidelines.component';

export const routes: Routes = [
    { path: '', component: App1Component },
    { path: '1', component: GuidelinesComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];






