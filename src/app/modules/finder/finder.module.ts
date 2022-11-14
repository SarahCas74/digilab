import { CommonModule } from '@angular/common';
import { FinderComponent } from './../../compenents/finder/finder.component';
import { FinderRoutingModule } from './finder-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [FinderComponent],
  imports: [
    CommonModule,
    FinderRoutingModule,
    SharedModule
  ],
  exports: [
    SharedModule
  ]
})
export class FinderModule { }
