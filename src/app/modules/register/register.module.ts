import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './../../compenents/register/register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [ RegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RegisterRoutingModule
  ],
  exports:[SharedModule]
})
export class RegisterModule { }
