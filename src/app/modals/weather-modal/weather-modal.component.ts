import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { Inject } from '@angular/core';
import { map, pipe, switchMap, take } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { fromEvent, delay } from 'rxjs';


@Component({
  selector: 'app-weather-modal',
  templateUrl: './weather-modal.component.html',
  styleUrls: ['./weather-modal.component.scss']
})
export class WeatherModalComponent implements OnInit {

  //déclarer le formulaire (nom dans le HTML)
  weatherForm!: FormGroup;
  showSpinner = false;

  constructor(
    //Pour injecter(ou transférer) les données d'une autre modal (dans ce cas l'adresse par défaut) et définir le nom des données avec un nom, ici "infos"
    @Inject(MAT_DIALOG_DATA) public infos: any,
    //Faire appel au service
    private _dataService: DataserviceService,
    //Pour construire le formulaire
    private _fb: FormBuilder,
    //Pour fermer la modal
    public _dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    //initialiser le formulaire
    this.weatherForm = this._fb.group({
      // Les Validators pour rendre les champs obligatoires
      // reprends les données par défaut du service grâce à l'Inject
      rue: [this.infos.rue, [Validators.required, Validators.minLength(2)]],
      cp: [this.infos.cp, [Validators.required, Validators.minLength(5)]],
      ville: [this.infos.ville, [Validators.required, Validators.minLength(2)]],
    })
  }

  //Implémenter la méthode qui permet de valider le formulaire de la modal,
  onSubmit(): void {
    //Mettre les valeurs du formulaire dans une constante
    const form = this.weatherForm.value;
    //Pour avoir l'heure d'aujourd'hui
    var now = new Date();
    var heure = now.getHours();


    //Implémenter la méthode du service, et indiquer dans les paramètres les données souhaitées
    this._dataService.getCoordinates(form.ville, form.rue, form.cp)
      // Le Pipe pour transformer ou filtrer les valeurs de l'observable, le Take pour récupérer qu'une seule valeur de l'observable (ici la ville), 
      //et le switch map renvoie une deuxième observable (les coordonnées GPS) en fonction du résultat reçu par la première observable
      // Rappel de ce qu'est une observable : elle émet un flux de données à un instant (sous forme d'interval ou en une seule fois)
      .pipe(switchMap
        ((responseFromServer: any) => {
        //! return obligatoire dans le switchMap, la méthode retourne elle même une observable
        // Si nous n'avons pas de service avec de méthode, nous pourrons utiliser from et of (opérateurs rxjs qui permettent de créer des observables)
        return this._dataService.getWeather(
          // Ce sont les deux paramètres qui correspondent aux paramètres de la méthode dans le service
          responseFromServer.features[0].geometry.coordinates[1],
          responseFromServer.features[0].geometry.coordinates[0]
        )
        //
      }),
      
      delay(2000)
      
      )


      //**On souscrit à la réponse du serveur Weather et 
      //! Transfert possible de data de données de la modal au compenent parent grâce au dialog Ref et la méthode .close
      .subscribe((responseFromWeatherServer: any) => {
        this._dialogRef.close({ temperature: responseFromWeatherServer.hourly.temperature_2m[heure], rue: form.rue, cp: form.cp, ville: form.ville });

      }
      )

  }


  onNoClick(): void { }
}




