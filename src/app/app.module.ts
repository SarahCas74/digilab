import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AgePipe } from './pipes/age.pipe';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './modules/shared/shared.module';
import { TokenInterceptorProvider } from './helpers/token.interceptor';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = { url:  `${environment.API_URL}`, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AgePipe,
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    CommonModule,
    SocketIoModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    BrowserModule
  ],
  exports: [
    SharedModule
  ],
  providers: [TokenInterceptorProvider],
  bootstrap: [AppComponent],

})
export class AppModule { }
