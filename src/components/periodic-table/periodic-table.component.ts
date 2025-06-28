import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ETableColumnNames, IPeriodicElement } from './periodic-table.model';
import { PeriodicTableStore } from './periodic-table.store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './periodic-table.component.html',
})
export class PeriodicTableComponent {
  private readonly store = inject(PeriodicTableStore);
  private dialog = inject(MatDialog);

  readonly baseColumnClasses = 'border rounded-full flex items-center justify-center';
  readonly columnClassMap: Record<string, string> = {
    position: `${this.baseColumnClasses} w-5 h-5 text-neutral-400 border-neutral-400`,
    symbol: `${this.baseColumnClasses} w-10 text-amber-450 border-amber-450`,
  };

  columns: string[] = Object.values(ETableColumnNames);
  filter = new FormControl('');
  ETableColumnNames = ETableColumnNames;
  dataSource = new MatTableDataSource<IPeriodicElement>();

  constructor() {
    this.store.loadElements();
    this.initData();
    this.initFilter();
  }

  initData() {
    effect(() => {
      this.dataSource.data = this.store.elements();
    });
  }

  initFilter() {
    const filterSignal = toSignal(
      this.filter.valueChanges.pipe(debounceTime(2000), distinctUntilChanged()),
      { initialValue: '' },
    );

    this.dataSource.filterPredicate = (data, f) => {
      const q = f.trim().toLowerCase();
      return Object.values(data).some((v) => String(v).toLowerCase().includes(q));
    };

    effect(() => {
      this.dataSource.filter = filterSignal()?.trim().toLowerCase() || '';
    });
  }

  onEdit(el: IPeriodicElement): void {
    this.dialog.open(EditModalComponent, {
      data: {
        element: el,
        index: this.dataSource.data.indexOf(el),
      },
    });
  }

  getColumnClasses(column: string): string {
    return this.columnClassMap[column] ?? '';
  }
}
