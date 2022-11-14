import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataserviceService } from 'src/app/services/dataservice.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm!: FormGroup;
  user = new UserModel();


  constructor(
    private fb: FormBuilder,
    private route: Router,
    private dataService: DataserviceService,
    private userService : UserService) { }

  ngOnInit(): void {

    this.userForm = this.fb.group({

      email: [this.user.email, Validators.required],
      password: [this.user.password, Validators.required],
    })
  }

  onSubmit(): void {

    Object.assign(this.user,this.userForm.value)
    this.userService.login(this.user).subscribe((response: any) => {
      localStorage.setItem('token',response.token)
          })



// A partir de la méthode du service, on récupère l'avatar de l'API
    this.dataService.getAvatar().subscribe((value: any) => {

// On récupère l'email du formlaire
    let emailInStorage = this.userForm.value.email

 //Objet créé un objet avec les deux éléments
 let index = Math.floor(Math.random()* (6 - 1) + 1 )
      const user = { avatar: value.data[index].avatar, email: emailInStorage }

// On le stocke dans le local storage en string
this.userService.login(this.user).subscribe((result:UserModel)=>{
  if (result) {
     localStorage.setItem('user', JSON.stringify(user))
     this.route.navigate(['/overview'])
  }
})
     
    })
// TODO dans le data Service
// 2 méthodes, getAvatar, et
// GetItem pour récupérer l'objet dans le local storage

//TODO dans le user ts
    
  }




}
