import { Injectable, signal, computed, inject } from '@angular/core';
import { IPeriodicElement } from './periodic-table.model';
import { PeriodicTableService } from '../../services/periodic-table.service';

@Injectable({ providedIn: 'root' })
export class PeriodicTableStore {
  private periodicTableService = inject(PeriodicTableService);
  private _elements = signal<IPeriodicElement[]>([]);
  private _filterTerm = signal('');

  elements = this._elements;
  filterTerm = this._filterTerm;

  filteredElements = computed(() => {
    const query = this._filterTerm().toLowerCase().trim();
    if (!query) return this._elements();

    return this._elements().filter((el) =>
      Object.values(el).some((val) => String(val).toLowerCase().includes(query)),
    );
  });

  loadElements() {
    this.periodicTableService.getData().subscribe({
      next: (data) => this._elements.set(structuredClone(data)),
      error: () => this._elements.set([]),
    });
  }

  setFilterTerm(value: string) {
    this._filterTerm.set(value);
  }

  updateElementByIndex(updated: IPeriodicElement, index: number) {
    this._elements.update((elements) => {
      const clone = structuredClone(elements);
      clone[index] = structuredClone(updated);
      return clone;
    });
  }
}
