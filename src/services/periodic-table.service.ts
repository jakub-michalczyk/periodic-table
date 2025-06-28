import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeriodicElement } from '../components/periodic-table/periodic-table.model';

@Injectable({ providedIn: 'root' })
export class PeriodicTableService {
  private http = inject(HttpClient);
  private readonly dataUrl = 'assets/data.json';

  getData(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.dataUrl);
  }
}
