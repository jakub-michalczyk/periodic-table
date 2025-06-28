import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPeriodicElement } from '../components/periodic-table/periodic-table.model';

@Injectable({ providedIn: 'root' })
export class PeriodicTableService {
  private http = inject(HttpClient);
  private readonly dataUrl = 'assets/data.json';

  getData(): Observable<IPeriodicElement[]> {
    return this.http.get<IPeriodicElement[]>(this.dataUrl);
  }
}
