import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { ChatModalComponent } from './../../../modals/chat-modal/chat-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from './../../../models/user-model';
import { UserService } from 'src/app/services/user.service';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  data!: any;
  searchBar!: FormGroup;
  userInfos!: any;
  users!: any[];
  friends!: any[]
  isChecked = false;
  userListAffichage!: UserModel[];
  usersTab!: any[];
  friendsTab!: any[];
  friendSelected!: any

  constructor(private userService: UserService,
    private _dialogmat: MatDialog,
    private _fb: FormBuilder, private _snackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    //Resolver
    this._activatedRoute.data.subscribe(({ userListResolver }) => {
      this.userListAffichage = userListResolver
    })

    //Searchbar en formbuilder
    this.searchBar = this._fb.group({
      Search: ['']
    })

    // pour récupérer les données de mon profil, faire appel à la méthode getProfil() du service :
    this.userService.getProfil().subscribe((response: any) => {
      this.userInfos = response
    })

    //pour récupérer la liste des utilisateurs, faire appel à la méthode getUsersList() du service :
    this.userService.getUsersList().subscribe((val: any) => {
      this.users = val.body
      this.usersTab = val.body

      //Pour ne pas parler à moi même, ne pas apparître dans la liste des Users
      this.users = this.users.filter(value => value.username != this.userInfos.username)

      //pour récupérer la liste des utilisateurs en ligne, faire appel à la méthode getOnlineUser() du service :
      this.userService.getOnlineUser().subscribe((users: any) => {
        this.users.forEach((ami: any) => {
          if ((users).includes(ami.username)) {
            ami.online = true
          }
        })
      })

      this.users.map((user: UserModel) => {
        user.avatar = user.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        return user
      })
    })

    //pour récupérer la liste des amis, faire appel à la méthode getFriendsList() du service :
    this.userService.getFriendsList().subscribe((reponse: any) => {
      this.friends = reponse.body
      this.friendsTab = reponse.body

      //pour récupérer la liste des amis en ligne, faire appel à la méthode getOnlineUser() du service :
      this.userService.getOnlineUser().subscribe((users: any) => {
        this.friends.forEach((ami: any) => {
          if ((users).includes(ami.username)) {
            ami.online = true
          }
        })
      })

      //Pour mettre un avatar sur les users qui n'en ont pas
      this.friends.map((user: UserModel) => {
        user.avatar = user.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        return user
      })
    })

    //on écoute continuellement s'il y a des utilisateurs en ligne
    this.userService.onlineUser()

    // pour filtrer la liste des utilisateurs dans la searchBar
    //@ts-ignore
    this.searchBar.get('Search').valueChanges.pipe((startWith(''))).subscribe((resultSearch: any) => {

      if (this.isChecked) {
        this.users = this.usersTab?.filter((elem: any) => elem.firstName.toLowerCase().includes(resultSearch))

      } else {
        this.friends = this.friendsTab?.filter((elem: any) => elem.firstName.toLowerCase().includes(resultSearch))
      }
    })


    this.userService.getMsgSubject().subscribe((message: any) => {

      this.friends.forEach((user: any) => {
        if (user.username !== this.friendSelected.username) {
          if (user.username == message.userID.username) {
            if (user.nbMsg) {
              user.nbMsg = user.nbMsg + 1
              console.log(user.nbMsg);
              
            } else {
              user.nbMsg = 1
            }
          }
        }
      })

      this.users.forEach((user: any) => {
        if (user.username !== this.friendSelected.username) {
          if (user.username == message.userID.username) {
            if (user.nbMsg) {
              user.nbMsg = user.nbMsg + 1
            } else {
              user.nbMsg = 1
            }
          }
        }
      })


    })

  }

  //Mettre un paramètre (user) dans la méthode qui permet d'ouvrir une  modal en fonction de la personne sélectionnée (user)
  onOpenDialog(user: any): void {

    const modal = this._dialogmat.open(ChatModalComponent, {
      width: '250px',
      //! TOUJOURS DATA :
      data: {
        nom: user.lastName,
        prenom: user.firstName,
        photo: user.avatar,
        id: user.id,
        username: user.username
      }
    })

    // Pour récupérer les données au moment de fermer la modal
    modal.afterClosed().subscribe((responseFromModal: any) => {
      if (responseFromModal) {
        // j'envoi l'info à travers un service à tous les components qui vont souscrire à cette observable
        this.userService.setUserCurrent(user)
      }
      console.warn(responseFromModal);
      if (responseFromModal) {
     
        this.users.forEach((user: any) => {
          if (responseFromModal.username == user.username) {
            if(user.nbMsg){

              user.nbMsg = null
              console.log(user.nbMsg);
            }
          }
        })



        this.friends.forEach((user: any) => {
          if (responseFromModal.username == user.username) {
            if(user.nbMsg){
              
              user.nbMsg = null
            }
          }
        })

      }
      this.friendSelected = responseFromModal
    })

  }

  //Mettre un paramètre (user) dans la méthode qui permet d'ajouter un ami en fonction de la personne sélectionnée (user)
  onAddFriend(user: any): void {
    this._snackBar.open('Vous avez bien ajouter un ami', 'ok')
    this.userService.addFriendService(user).subscribe((response) => {
      if (response) {
        this.friends.push(user)
      }
    })
  }

  //Pour supprimer un ami
  onRemoveFriend(user: any): void {
    this.userService.removeFriendService(user).subscribe((response) => {
      this._snackBar.open('Vous avez bien supprimer un ami', 'ok')
      this.friends = this.friends.filter((value: any) => value.username !== user.username)
    })
  }

}
