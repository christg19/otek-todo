import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { GetListRoutingModule } from './get-list-routing.module';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GetListRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ]
})
export class GetListModule { }
