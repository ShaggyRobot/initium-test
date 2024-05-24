import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Client, ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-creation-dialog',
  templateUrl: './creation-dialog.component.html',
  styleUrls: ['./creation-dialog.component.scss'],
})
export class CreationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreationDialogComponent>,
    private fb: FormBuilder,
    private clients: ClientsService
  ) {}

  clientForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    surname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.pattern(/(^(\+7|7|8)+([0-9]){10}$)/)],
  });

  onCancel(): void {
    this.dialogRef.close('cancelled');
  }

  onConfirm(): void {
    this.onSubmit();
  }

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
      this.clients.addClient(this.clientForm.value as Client);
      this.dialogRef.close();
    }
  }
}
