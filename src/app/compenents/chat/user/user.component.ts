import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { ChatModalComponent } from './../../../modals/chat-modal/chat-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from './../../../models/user-model';
import { UserService } from 'src/app/services/user.service';

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
  friends: any[] = []
  isChecked = false;
  userListAffichage!:UserModel[];

  constructor(private userService: UserService,
    private _dialogmat: MatDialog,
    private _fb: FormBuilder, private _snackBar: MatSnackBar,
    private _activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {

    //Resolver
    this._activatedRoute.data.subscribe(({userListResolver})=>{
    this.userListAffichage=userListResolver })

    //Searchbar en formbuilder
    this.searchBar = this._fb.group({
      Search: ['', Validators.required]
    })

    // pour filtrer la liste des utilisateurs dans la searchBar
    //@ts-ignore
    this.searchBar.get('Search').valueChanges.subscribe((val: string) => {
      this.userInfos = this.data.filter((user: any) => {
        return user.first_name.toLowerCase().includes(val.toLowerCase())
      })
    })

    // pour récupérer les données de mon profil, faire appel à la méthode getProfil() du service :
    this.userService.getProfil().subscribe((response: any) => {

      this.userInfos = response
    })

    //pour récupérer la liste des utilisateurs, faire appel à la méthode getUsersList() du service :
    this.userService.getUsersList().subscribe((val: any) => {
      this.users = val.body

      //pour récupérer la liste des utilisateurs en ligne, faire appel à la méthode getOnlineUser() du service :
      this.userService.getOnlineUser().subscribe((users: any) => {
        this.users.forEach((ami: any) => {
          if ((users).includes(ami.username)) {
            ami.online = true
       

          }
        })
      })
    })

 

    //pour récupérer la liste des amis, faire appel à la méthode getFriendsList() du service :
    this.userService.getFriendsList().subscribe((reponse: any) => {
      this.friends = reponse.body

      //pour récupérer la liste des amis en ligne, faire appel à la méthode getOnlineUser() du service :
      this.userService.getOnlineUser().subscribe((users: any) => {
        this.friends.forEach((ami: any) => {
          if ((users).includes(ami.username)) {
            ami.online = true
 

          }
        })
      })
    })

   //on écoute continuellement s'il y a des utilisateurs en ligne
    this.userService.onlineUser()

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
      }
    })

    // Pour récupérer les données au moment de fermer la modal
    modal.afterClosed().subscribe((responseFromModal: any) => {
      if (responseFromModal) {
        // j'envoi l'info à travers un service à tous les components qui vont souscrire à cette observable
        this.userService.setUserCurrent(user)
      }
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
