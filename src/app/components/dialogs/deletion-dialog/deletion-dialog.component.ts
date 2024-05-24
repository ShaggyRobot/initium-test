import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-deletion-dialog',
  templateUrl: './deletion-dialog.component.html',
  styleUrls: ['./deletion-dialog.component.scss'],
})
export class DeletionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletionDialogComponent>,
    private clients: ClientsService,
    @Inject(MAT_DIALOG_DATA) public data: Array<string>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.clients.deleteClients(this.data);
    this.dialogRef.close(true);
  }
}
