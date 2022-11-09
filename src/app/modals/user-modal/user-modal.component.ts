import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  constructor(    
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ref:MatDialogRef<any>,
    private _route:Router) { }

  ngOnInit(): void {
  }
  
  closeModal() {
    this._ref.close();
    this._route.navigate(['/overview'])
  }
}


