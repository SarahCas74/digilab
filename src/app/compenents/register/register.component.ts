import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

import { DataserviceService } from 'src/app/services/dataservice.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserModalComponent } from 'src/app/modals/user-modal/user-modal.component';
import { UserModel } from './../../models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

// Pour calculer automatiquement l'âge

// export class RegisterComponent implements OnInit {
//   dateOfBirth : any;
//   constructor() { }

//   ngOnInit(): void {
//   }

//   calculateTheAge(event : any){
//     console.log(event);
//   }

// };

export class RegisterComponent implements OnInit {
  loginForm!: FormGroup;
  userForm!: FormGroup;
  myControl = new FormControl('');
  pays!: any;
  options: string[] = [];
  filteredOptions!: Observable<string[]>
  dateOfBirth: any;
  //importer le model
  user = new UserModel();
  errorPass=true


  constructor(
    private fb: FormBuilder,
    private dataService: DataserviceService,
    private userService: UserService,
    private matdialog: MatDialog,
    private route:Router,
    private _snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {

    this.user.avatar = 'https://picsum.photos/200'
    
    this.userForm = this.fb.group({ // Crée une instance de FormGroup

      lastName: [this.user.lastName, Validators.required], // Crée une instance de FormControl
      firstName: [this.user.firstName, Validators.required], 
      username: [this.user.username, Validators.required], 
      dateOfBirth: [this.user.dateOfBirth, Validators.required], 
      email: [this.user.email, Validators.required], 
      dialCode: [this.user.dialCode, Validators.required], 
      phoneNumber: [this.user.phoneNumber, Validators.required], 
      street: [this.user.street, Validators.required], 
      zipCode: [this.user.zipCode, Validators.required], 
      city: [this.user.city, Validators.required], 
      country: [this.user.country, Validators.required], 
      password: [this.user.password, Validators.required], 
      confirmPassword: [this.user.confirmPassword, Validators.required], 
      skills: new FormArray([]),
    })

    this.dataService.getCountries().subscribe((countries: any) => {
      this.pays = countries;
      this.options = this.sortCountries()
    })

    // @ts-ignore
    this.filteredOptions = this.userForm?.get('country')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),

      
      )


  }

  // Méthode pour calculer l'âge
  calculateTheAge(event: any) {
    console.log(event);

  }

  //Méthode pour filtrer que les pays
  sortCountries(): string[] {
    return this.pays.map((countryName: any) => countryName.name.common)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    //CONFIRM PASSWORD
    const password =this.userForm.value.password
    const confirmPassword =this.userForm.value.confirmPassword

    if (password !== confirmPassword) {
      this._snackBar.open('Vos mots de passes ne correspondent pas', 'ok',{verticalPosition:'top'})
      return;
    }

    Object.assign(this.user,this.userForm.value)
    this.userService.register(this.user).subscribe((response: any) => {
      localStorage.setItem('token',response.token)
      console.log(response.token);
      
      

      this.matdialog.open(UserModalComponent, {
        width: '250px',
        
        data: { date: response.createdAt, infos: response }
        
      })


      this.user.skills = this.user.skills
      console.log(this.user);
      

    })

   

    
  }

  get skills(): FormArray {
    return this.userForm.get("skills") as FormArray
  }

  addSkills() {
    const skillsForm = new FormControl('');
    this.skills.push(skillsForm)
  }

  deleteSkill(skillsIndex: number) {
    this.skills.removeAt(skillsIndex)
  }

}