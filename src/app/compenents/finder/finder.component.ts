import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

import { DataserviceService } from 'src/app/services/dataservice.service';
import { job } from './../../helpers/helpers';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent implements OnInit {
  searchSkillForm!: FormGroup;
  metier: any;
  options: string[] = [];
  filteredOptions!: Observable<string[]>;


  constructor(
    private _fb: FormBuilder,
    private _dataService: DataserviceService,
  ) { }

  ngOnInit(): void {

    this.searchSkillForm = this._fb.group({
      Search: ['', Validators.required]
    })
    
    this.metier = this._dataService.getJob()
    this.options = this.sortJob()
    console.log(this.metier);

    // @ts-ignore
    this.filteredOptions = this.searchSkillForm?.get('Search')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    )

  }

   //Méthode pour filtrer les métiers

   sortJob(): string[] {
    return this.metier.map((jobName: any) => jobName)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
