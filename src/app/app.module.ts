import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MAT_RIPPLE_GLOBAL_OPTIONS,
  RippleGlobalOptions,
} from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';

import { AppComponent } from './app.component';
import { DeletionDialogComponent } from 'src/app/components/dialogs/deletion-dialog/deletion-dialog.component';
import { CreationDialogComponent } from './components/dialogs/creation-dialog/creation-dialog.component';
import { EditionDialogComponent } from './components/dialogs/edition-dialog/edition-dialog.component';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,

  animation: {
    enterDuration: 0,
    exitDuration: 0,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    ClientsTableComponent,
    DeletionDialogComponent,
    CreationDialogComponent,
    EditionDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
