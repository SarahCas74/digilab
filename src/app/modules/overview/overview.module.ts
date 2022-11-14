import { ChatComponent } from './../../compenents/chat/chat.component';
import { ChatroomComponent } from './../../compenents/chat/chatroom/chatroom.component';
import { CommonModule } from '@angular/common';
import { DirectoryComponent } from './../../compenents/directory/directory.component';
import { NgModule } from '@angular/core';
import { OverviewComponent } from './../../compenents/overview/overview.component';
import { OverviewRoutingModule } from './overview-routing.module';
import { ProfilComponent } from './../../compenents/profil/profil.component';
import { SharedModule } from './../shared/shared.module';
import { TopbarchatComponent } from './../../compenents/chat/chatroom/topbarchat/topbarchat.component';
import { UserComponent } from './../../compenents/chat/user/user.component';

@NgModule({
  declarations: [
    OverviewComponent, 
    UserComponent, 
    ChatroomComponent, 
    DirectoryComponent, 
    ChatComponent, 
    ProfilComponent,
    TopbarchatComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    SharedModule
  ],
  exports:[
    SharedModule
  ]
})
export class OverviewModule { }
