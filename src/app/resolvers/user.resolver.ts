import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { UserService } from './../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<UserModel[]> {

  constructor(private userService:UserService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel[]> {
    return this.userService.getUsersList();
  }
}
