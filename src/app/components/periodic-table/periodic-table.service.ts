import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodicElement } from './periodic-table.model';

@Injectable({
  providedIn: 'root',
})
export class PeriodicTableService {
  private dataUrl = 'assets/elements.json';

  constructor(private http: HttpClient) {}

  getElements(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.dataUrl);
  }
}
