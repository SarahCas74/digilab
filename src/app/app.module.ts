import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AgePipe } from './pipes/age.pipe';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ChatComponent } from './compenents/chat/chat.component';
import { ChatModalComponent } from './modals/chat-modal/chat-modal.component';
import { ChatroomComponent } from './compenents/chat/chatroom/chatroom.component'
import { CommonModule } from '@angular/common';
import { DirectoryComponent } from './compenents/directory/directory.component';
import { DirectoryModalComponent } from './modals/directory-modal/directory-modal.component';
import { FinderComponent } from './compenents/finder/finder.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './compenents/login/login.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { OverviewComponent } from './compenents/overview/overview.component';
import { ProfilComponent } from './compenents/profil/profil.component';
import { RegisterComponent } from './compenents/register/register.component';
import { TokenInterceptorProvider } from './helpers/token.interceptor';
import { TopbarchatComponent } from './compenents/chat/chatroom/topbarchat/topbarchat.component';
import { UserComponent } from './compenents/chat/user/user.component';
import { UserModalComponent } from './modals/user-modal/user-modal.component';
import { WeatherComponent } from './compenents/weather/weather.component';
import { WeatherModalComponent } from './modals/weather-modal/weather-modal.component';
import { environment } from 'src/environments/environment';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

const config: SocketIoConfig = { url:  `${environment.API_URL}`, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProfilComponent,
    AgePipe,
    RegisterComponent,
    UserModalComponent,
    DirectoryComponent,
    DirectoryModalComponent,
    WeatherComponent,
    LoginComponent,
    WeatherModalComponent,
    OverviewComponent,
    ChatroomComponent,
    ChatComponent,
    TopbarchatComponent,
    ChatModalComponent,
    FinderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
    SocketIoModule,
    SocketIoModule.forRoot(config),
    MatSlideToggleModule,
    MatChipsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule
  ],
  providers: [TokenInterceptorProvider],
  bootstrap: [AppComponent],
  entryComponents: [UserModalComponent],
})
export class AppModule { }
