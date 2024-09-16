import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { PeriodicTableService } from './periodic-table.service';
import { PeriodicElement } from './periodic-table.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [PeriodicTableService],
  templateUrl: './periodic-table.component.html',
})
export class PeriodicTableComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'actions',
  ];
  filterControl = new FormControl('');
  dataSource: PeriodicElement[] = [];
  filteredData: PeriodicElement[] = [];
  isLoading = true;

  constructor(private periodicTableService: PeriodicTableService) {}

  ngOnInit(): void {
    this.periodicTableService.getElements().subscribe((data) => {
      this.dataSource = data;
      this.filteredData = data;
      this.isLoading = false;
    });
  }
}
