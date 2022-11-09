import { CanActivate, RouterModule, Routes } from '@angular/router';
import { Component, NgModule } from '@angular/core';

import { AuthGuard } from './helpers/auth.guard';
import { ChatComponent } from './compenents/chat/chat.component';
import { ChatroomComponent } from './compenents/chat/chatroom/chatroom.component';
import { DirectoryComponent } from './compenents/directory/directory.component';
import { FinderComponent } from './compenents/finder/finder.component';
import { LoginComponent } from './compenents/login/login.component';
import { OverviewComponent } from './compenents/overview/overview.component';
import { ProfilComponent } from './compenents/profil/profil.component';
import { RegisterComponent } from './compenents/register/register.component';
import { TopbarchatComponent } from './compenents/chat/chatroom/topbarchat/topbarchat.component';
import { UserComponent } from './compenents/chat/user/user.component';
import { UserResolver } from './resolvers/user.resolver';

const routes: Routes = [

  // Chemin par défaut si on ne met rien avec les '' ici la page d'accueil est le LoginComponent
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'finder', component: FinderComponent, canActivate:[AuthGuard]},
  { path: 'overview', component: OverviewComponent,  canActivate:[AuthGuard],
    children: [
      { path: 'profil', component: ProfilComponent,  canActivate:[AuthGuard]},
      { path: 'directory', component: DirectoryComponent,  canActivate:[AuthGuard]},
      { path: 'chat', component: ChatComponent,  canActivate:[AuthGuard],
        children: [
          { path: 'user', component:UserComponent, canActivate:[AuthGuard], resolve:{userListResolver : UserResolver}},
          { path: 'chatroom', component: ChatroomComponent,  canActivate:[AuthGuard],
            children: [
              { path: 'topbarchat', component: TopbarchatComponent,  canActivate:[AuthGuard]}]},
        ]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
