import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { ETableColumnNames, IPeriodicElement } from '../periodic-table/periodic-table.model';
import { PeriodicTableStore } from '../periodic-table/periodic-table.store';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-modal.component.html',
})
export class EditModalComponent {
  private fb = inject(FormBuilder).nonNullable;
  private store = inject(PeriodicTableStore);
  private dialogRef = inject(MatDialogRef<EditModalComponent>);
  private data = inject<{ element: IPeriodicElement; index: number }>(MAT_DIALOG_DATA);

  readonly numberFields = [ETableColumnNames.POSITION, ETableColumnNames.WEIGHT];

  fields = Object.keys(this.data.element) as ETableColumnNames[];

  form = this.fb.group({
    position: [this.data.element.position, [Validators.required, Validators.min(0)]],
    name: [this.data.element.name, Validators.required],
    weight: [this.data.element.weight, Validators.required],
    symbol: [this.data.element.symbol, Validators.required],
  });

  isNumberField(key: ETableColumnNames): boolean {
    return this.numberFields.includes(key);
  }

  getStepForField(key: string): string | null {
    if (key === ETableColumnNames.WEIGHT) return '0.0001';
    if (key === ETableColumnNames.POSITION) return '1';
    return null;
  }

  save(): void {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    const updated: IPeriodicElement = {
      position: Number(raw.position),
      name: raw.name,
      weight: Number(raw.weight),
      symbol: raw.symbol,
    };

    this.store.updateElementByIndex(updated, this.data.index);
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
