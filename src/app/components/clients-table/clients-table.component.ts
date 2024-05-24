import { Input, Component, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';

import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { CreationDialogComponent } from 'src/app/components/dialogs/creation-dialog/creation-dialog.component';
import { DeletionDialogComponent } from 'src/app/components/dialogs/deletion-dialog/deletion-dialog.component';
import { EditionDialogComponent } from 'src/app/components/dialogs/edition-dialog/edition-dialog.component';

import type { ClientWithId } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent implements AfterViewInit {
  @Input() set data(value: ClientWithId[]) {
    this.dataSource = new MatTableDataSource<ClientWithId>(value);
    this.dataSource.sort = this.sort;
  }

  selection = new SelectionModel<string>(true, []);

  dataSource!: MatTableDataSource<ClientWithId>;

  displayedCols: string[] = [
    'select',
    'name',
    'surname',
    'email',
    'phone',
    'margin',
  ];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  openDeletionDialog(): void {
    this.dialog
      .open(DeletionDialogComponent, {
        data: this.selection.selected,
      })
      .afterClosed()
      .subscribe((confirmed) => confirmed && this.selection.clear());
  }

  openCreationDialog(): void {
    this.dialog.open(CreationDialogComponent);
  }

  openEditionDialog(client: ClientWithId): void {
    this.dialog.open(EditionDialogComponent, {
      data: client,
    });
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data.map((client) => client.id));
  }
}
