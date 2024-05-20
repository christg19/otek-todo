import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetListComponent } from './get-list/get-list.component';

const routes: Routes = [
  {path: '', component: GetListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
