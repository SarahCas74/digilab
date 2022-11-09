import { DirectoryModalComponent } from './../../modals/directory-modal/directory-modal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  public _directories:any[] = [];
  
  constructor(
    private _dialog: MatDialog,
    private userService: UserService,) { }

  ngOnInit(): void {}

  openDialog(): void {
    const modal = this._dialog.open(DirectoryModalComponent, {
      width: '250px',
    })

    modal.afterClosed().subscribe((responseFromModal:any)=>{
      this._directories=[responseFromModal,...this._directories]
    })

  }
}


