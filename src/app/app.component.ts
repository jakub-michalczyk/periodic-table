import { Component } from '@angular/core';
import { PeriodicTableComponent } from '../components/periodic-table/periodic-table.component';

@Component({
  selector: 'app-root',
  imports: [PeriodicTableComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
