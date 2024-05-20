import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetListComponent } from './get-list.component';

const routes: Routes = [
  {path: '', component:GetListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetListRoutingModule { }
