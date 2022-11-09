import { Component, OnInit } from '@angular/core';

import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog, } from '@angular/material/dialog';
import { WeatherModalComponent } from 'src/app/modals/weather-modal/weather-modal.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})

export class WeatherComponent implements OnInit {
  // Initaliser un objet dont on veut voir apparâitre les données
  meteo = {
    rue: '',
    cp: '',
    ville: '',
    temperature:''
  }

  // Pour ouvrir une modal
  constructor(private matdialog: MatDialog) { }

  ngOnInit(): void { }

  //Par convention, mettre "on" dans le nom de la méthode
  onOpenNewAdress(): void {
    const dialogRef = this.matdialog.open(WeatherModalComponent,
      //Toujours écrire data, pas un autre mot 
      { data: this.meteo })
      //Utiliser la constante dialogRef pour utiliser la méthode afterClosed
    dialogRef.afterClosed().subscribe((responseFromWeatherModal:any)=>{
      this.meteo=responseFromWeatherModal;
      
    })
    
  }
}
