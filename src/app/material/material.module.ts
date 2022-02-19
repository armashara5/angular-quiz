import { NgModule } from '@angular/core';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatCommonModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const material = [
  MatListModule,
  MatDividerModule,
  MatFormFieldModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatInputModule,
  MatCommonModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
