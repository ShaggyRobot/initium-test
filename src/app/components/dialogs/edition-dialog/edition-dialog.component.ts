import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Client,
  ClientWithId,
  ClientsService,
} from 'src/app/services/clients.service';

@Component({
  selector: 'app-edition-dialog',
  templateUrl: './edition-dialog.component.html',
  styleUrls: ['./edition-dialog.component.scss'],
})
export class EditionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditionDialogComponent>,
    private fb: FormBuilder,
    private clients: ClientsService,
    @Inject(MAT_DIALOG_DATA) public data: ClientWithId
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.onSubmit();
  }

  clientForm = this.fb.group({
    name: [this.data.name, [Validators.required, Validators.minLength(2)]],
    surname: [
      this.data.surname,
      [Validators.required, Validators.minLength(2)],
    ],
    email: [this.data.email, [Validators.required, Validators.email]],
    phone: [this.data.phone, Validators.pattern(/(^(\+7|7|8)+([0-9]){10}$)/)],
  });

  get nameErrors(): string {
    return this.clientForm.get('name')?.invalid ? 'Минимум 2 символа.' : '';
  }

  get surnameErrors(): string {
    return this.clientForm.get('surname')?.invalid ? 'Минимум 2 символа.' : '';
  }

  get emailErrors(): string {
    return this.clientForm.get('email')?.invalid ? 'Некорректный email.' : '';
  }

  get phoneErrors(): string {
    return this.clientForm.get('phone')?.invalid
      ? 'Некорректный номер телефона.'
      : '';
  }

  onSubmit(): void {
    this.clientForm.markAllAsTouched();

    if (this.clientForm.valid) {
      this.clients.editClient({
        ...this.clientForm.value,
        id: this.data.id,
      } as ClientWithId);
      this.dialogRef.close();
    }
  }
}
