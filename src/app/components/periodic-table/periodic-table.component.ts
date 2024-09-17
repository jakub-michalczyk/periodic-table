import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { PeriodicTableService } from './periodic-table.service';
import { PeriodicElement } from './periodic-table.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

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
  private destroyerRef = inject(DestroyRef);

  constructor(
    private periodicTableService: PeriodicTableService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.initializeFilter();
  }

  private loadData(): void {
    this.isLoading = true;
    this.periodicTableService
      .getElements()
      .pipe(takeUntilDestroyed(this.destroyerRef))
      .subscribe((data) => {
        this.dataSource = data;
        this.filteredData = data;
        this.isLoading = false;
      });
  }

  private initializeFilter(): void {
    this.filterControl.valueChanges
      .pipe(debounceTime(2000), takeUntilDestroyed(this.destroyerRef))
      .subscribe((value) => {
        const filterValue = value ? value.trim().toLowerCase() : '';
        this.applyFilter(filterValue);
      });
  }

  applyFilter(filter: string): void {
    if (!filter) {
      this.filteredData = this.dataSource;
      return;
    }

    this.filteredData = this.dataSource.filter(
      (element) =>
        element.name.toLowerCase().includes(filter) ||
        element.symbol.toLowerCase().includes(filter) ||
        element.weight.toString().includes(filter) ||
        element.position.toString().includes(filter)
    );
  }

  openEditModal(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '250px',
      data: { ...element },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyerRef))
      .subscribe((result) => {
        if (result) {
          this.updateElement(result);
        }
      });
  }

  private updateElement(updatedElement: PeriodicElement): void {
    const index = this.dataSource.findIndex(
      (el) => el.position === updatedElement.position
    );
    if (index !== -1) {
      this.dataSource = [
        ...this.dataSource.slice(0, index),
        updatedElement,
        ...this.dataSource.slice(index + 1),
      ];
      this.applyFilter(this.filterControl.value || '');
    }
  }
}
