import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataserviceService } from 'src/app/services/dataservice.service';

export interface DialogData { }

@Component({
  selector: 'app-directory-modal',
  templateUrl: './directory-modal.component.html',
  styleUrls: ['./directory-modal.component.scss']
})

export class DirectoryModalComponent implements OnInit {

  directoryForm!: FormGroup;
  pathPattern = "[a-zA-Z0-9]{2,}"

  constructor(
    private _fb: FormBuilder,
    private _dataService: DataserviceService,
    public _dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit(): void {
    this.directoryForm = this._fb.group({
      nom: ['', Validators.minLength(2)],
      chemin: ['', [Validators.required, Validators.pattern(this.pathPattern)]],
      description: ['',[Validators.required, Validators.minLength(10)]],
    })
  }

  onNoClick(): void { }

  onSubmit(): void {
    const form = this.directoryForm.value
    this._dataService.postData(form).subscribe((responseFromServer: any) => {
      this._dialogRef.close(responseFromServer);
    })
  }

}
