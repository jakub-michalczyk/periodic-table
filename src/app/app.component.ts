import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PeriodicTableComponent } from '../components/periodic-table/periodic-table.component';

@Component({
  selector: 'app-root',
  imports: [PeriodicTableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
})
export class AppComponent {}
