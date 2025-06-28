import { Component, computed, effect, inject, OnInit, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { PeriodicTableService } from '../../services/periodic-table.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { PeriodicElement } from './periodic-table.model';
import { PeriodicTableStore } from './periodic-table.store';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './periodic-table.component.html',
})
export class PeriodicTableComponent {
  private readonly store = inject(PeriodicTableStore);
  columns = ['position', 'name', 'weight', 'symbol', 'actions'];
  elements = this.store.filteredElements;
  filter = new FormControl('');

  constructor() {
    this.store.loadElements();
    this.initFilter();
  }

  initFilter() {
    this.filter.valueChanges.pipe(debounceTime(2000), distinctUntilChanged()).subscribe((value) => {
      this.store.setFilterTerm(value ?? '');
    });
  }

  onEdit(el: PeriodicElement) {}
}
