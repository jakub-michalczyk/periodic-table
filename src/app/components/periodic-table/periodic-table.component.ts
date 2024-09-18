import { Component, DestroyRef, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ElementStateService } from '../../shared/services/element-state.service';
import { AsyncPipe } from '@angular/common';
import { PeriodicElement } from './periodic-table.model';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    AsyncPipe,
  ],
  templateUrl: './periodic-table.component.html',
})
export class PeriodicTableComponent {
  private destroyerRef = inject(DestroyRef);
  elements$ = this.elementStateService.filteredElements$();
  loading$ = this.elementStateService.loading$;
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'actions',
  ];

  constructor(
    private elementStateService: ElementStateService,
    private dialog: MatDialog
  ) {}

  onFilterInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.elementStateService.applyFilter(input.value);
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
          this.elementStateService.updateElement(result);
        }
      });
  }
}
