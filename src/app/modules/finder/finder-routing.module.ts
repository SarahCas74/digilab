import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/helpers/auth.guard';
import { FinderComponent } from 'src/app/compenents/finder/finder.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: FinderComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinderRoutingModule { }
