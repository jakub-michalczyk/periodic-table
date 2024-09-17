import { Routes } from '@angular/router';
import { PeriodicTableComponent } from './components/periodic-table/periodic-table.component';

export const routes: Routes = [
  { path: '', redirectTo: '/periodic-table', pathMatch: 'full' },
  { path: 'periodic-table', component: PeriodicTableComponent },
  { path: '**', redirectTo: '/periodic-table' },
];
