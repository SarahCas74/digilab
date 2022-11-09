import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-topbarchat',
  templateUrl: './topbarchat.component.html',
  styleUrls: ['./topbarchat.component.scss']
})
export class TopbarchatComponent implements OnInit {

  data!: any

  constructor(private _userService: UserService) { }

  ngOnInit(): void {

    this._userService.getUserCurrent().subscribe((response: any) => {
      this.data = response
    })

  }

}