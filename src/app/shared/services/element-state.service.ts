import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  map,
  catchError,
  debounceTime,
  switchMap,
  startWith,
} from 'rxjs/operators';
import { PeriodicElement } from '../../components/periodic-table/periodic-table.model';

@Injectable({
  providedIn: 'root',
})
export class ElementStateService extends RxState<{
  elements: PeriodicElement[];
  loading: boolean;
}> {
  private filterSubject = new BehaviorSubject<string>('');

  elements$ = this.select('elements');
  loading$ = this.select('loading');

  constructor(private http: HttpClient) {
    super();
    this.set({ loading: true });
    this.loadElements();
  }

  private loadElements(): void {
    this.http
      .get<PeriodicElement[]>('assets/elements.json')
      .pipe(
        catchError(() => {
          this.set({ loading: false });
          return of([]);
        })
      )
      .subscribe((elements) => {
        this.set({ elements, loading: false });
      });
  }

  applyFilter(filterValue: string) {
    this.filterSubject.next(filterValue.trim().toLowerCase());
  }

  filteredElements$(): Observable<PeriodicElement[]> {
    return this.filterSubject.pipe(
      debounceTime(2000),
      startWith(''),
      switchMap((filterValue) =>
        this.elements$.pipe(
          map((elements) =>
            elements.filter(
              (el) =>
                el.name.toLowerCase().includes(filterValue) ||
                el.symbol.toLowerCase().includes(filterValue) ||
                el.position.toString().includes(filterValue) ||
                el.weight.toString().includes(filterValue)
            )
          )
        )
      )
    );
  }

  updateElement(updatedElement: PeriodicElement): void {
    this.set((state) => {
      return {
        elements: state.elements.map((element) =>
          element.position === updatedElement.position
            ? updatedElement
            : element
        ),
      };
    });
  }
}
