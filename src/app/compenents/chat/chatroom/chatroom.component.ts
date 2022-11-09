import { Component, OnInit } from '@angular/core';

// import { DataserviceService } from 'src/app/services/dataservice.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Socket } from 'ngx-socket-io';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})

export class ChatroomComponent implements OnInit {
  data!: any;
  message: FormControl = new FormControl();
  socket!: Socket;
  allMessages: any[] = [];
  messageDirectReceived = {
    content: '',
    date: '',
    friendID: {
      username: '',
      _id: ''
    },
    userID: {
      username: '',
      _id: ''
    },
    _v: 0,
    _id: ''
  };
  messageDirectSent = {
    content: '',
    date: '',
    friendID: {
      username: '',
      _id: ''
    },
    userID: {
      username: '',
      _id: ''
    },
    _v: 0,
    _id: ''
  }


  constructor(
    private _userService: UserService,
    // private _dataService: DataserviceService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    //API CHAT JOKES
    // this._dataService.getMessages().subscribe((result: any) => {
    //   this.msgSend = result
    // })

    // la méthode getUserCurrent réagit uniquement si au préalable la méthode setUserCurrent est appelée
    this._userService.getUserCurrent().subscribe((response: any) => {
      this.data = response;

      this._userService.newGetFriendMessage(response.username).subscribe((value: any) => {
        this.allMessages = value

      })
    })

    this._userService.initDiscussion("msg:string")

    //On écoute continullement les messages que J'ENVOIE
    this._userService.confirmMessagesSent()
    this._userService.confirmMessageSubject().subscribe((value: any) => {

      this.messageDirectSent.content = value.content

      this.allMessages.push(this.messageDirectSent)
    })


    //On écoute continullement les messages que JE RECOIS
    this._userService.getMsgOnline()


    this._userService.getMsgSubject().subscribe((msgRecu: any) => {
      this.snackBar.open(`Vous avez reçu un message de ${msgRecu.userID.username}`, 'ok')

      this.messageDirectReceived.content = msgRecu.content

      if (this.data.username == msgRecu.userID.username) {
        this.allMessages.push(this.messageDirectReceived)
      }
    })

  }


  //Méthode quand on clique sur le bouton "envoyer"
  onSend(): void {

    const valueForm = this.message.value
    this._userService.sendMessage(this.data, valueForm)

    //Pour supprimer le message une fois que je l'ai envoyé
    this.message.reset()
  }

  //Méthode quand on tape sur entrer pour envoyer
  onSendMessage(event: KeyboardEvent) {
    if (event.code === "Enter") {
      this.onSend()
    }
  }

}
