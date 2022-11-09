import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public _emailEtPass: any[] = [];

  constructor(private _userService: UserService) { }

  ngOnInit(): void {



  }

  onClick(): void {
    this._userService.clearToken()
  }

}
