import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/helpers/auth.guard';
import { ChatComponent } from 'src/app/compenents/chat/chat.component';
import { DirectoryComponent } from 'src/app/compenents/directory/directory.component';
import { NgModule } from '@angular/core';
import { OverviewComponent } from 'src/app/compenents/overview/overview.component';
import { ProfilComponent } from 'src/app/compenents/profil/profil.component';
import { UserComponent } from './../../compenents/chat/user/user.component';
import { UserResolver } from './../../resolvers/user.resolver';

const routes: Routes = [
  { path: '', component: OverviewComponent,  canActivate:[AuthGuard],
    children: [
      { path: 'profil', component: ProfilComponent,  canActivate:[AuthGuard]},
      { path: 'directory', component: DirectoryComponent,  canActivate:[AuthGuard]},
      { path: 'chat', component: ChatComponent,  canActivate:[AuthGuard],
    children: [
      { path:'user', component:UserComponent, canActivate:[AuthGuard],resolve:{userListResolver: UserResolver}}
    ]},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
