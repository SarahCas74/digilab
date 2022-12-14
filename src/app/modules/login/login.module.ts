import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/compenents/login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ],
  exports: [
    SharedModule
  ]
})
export class LoginModule { }
