import { Component, Inject, OnInit } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DialogData { }

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit {
user!:any

  chatForm!: FormGroup;
  constructor(
    // Mettre le décorateur Inject dans le constructeur et donner un nom (ici infosUser) aux données
    //Bien mettre en public pour les afficher dans l'HTML
    @Inject(MAT_DIALOG_DATA) public infosUser: any,
    //Pour fermer la modal : mat dialog ref
    public _dialogRef: MatDialogRef<any>,
    private route:Router,
  ) { }

  ngOnInit(): void {
    
  }

  onClick(): void {
//Pour fermer la modal : mat dialog ref et pour récupérer les infos
    this._dialogRef.close(this.infosUser)
    this.route.navigate(['/overview/chat/chatroom'])

  }

  onNoClick():void{
    this._dialogRef.close()
  }

}
