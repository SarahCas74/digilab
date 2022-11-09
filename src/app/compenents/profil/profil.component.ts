import { Component, OnInit } from '@angular/core';

import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  dataUser: any;
  dataUserParse: any;
  mailSplit: any;
  nomPrenom: any;

  constructor(
    private _dataService : DataserviceService
  ) { }

  ngOnInit(): void {

        //----------- DEBUT récupérer les infos du login-----------
    //on récupère la méthode du service
    this.dataUser = this._dataService.getItem()
    //on déstringifye l'objet
    this.dataUserParse = JSON.parse(this.dataUser)
    

    // On Split l'email
    this.mailSplit = this.dataUserParse.email.split('@')
  // Pour récupérer le nom et prénom
    this.nomPrenom=this.mailSplit[0].split('.')   

    //----------- FIN récupérer les infos du login-----------
  }

}
