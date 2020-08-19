import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipVozila, GetStringValues } from 'src/app/_enums';
import { Kola } from 'src/app/entities/objects/kola';

@Component({
  selector: 'app-dodaj-kola',
  templateUrl: './dodaj-kola.component.html'
})
export class DodajKolaComponent implements OnInit {
  carForm: FormGroup;
  static kola: Kola;

  constructor() {
    let year = new Date();
    this.carForm = new FormGroup({
      'brojMesta': new FormControl('valid', [Validators.required, Validators.min(1)]),
      'godiste': new FormControl('valid', [Validators.required, Validators.min(1900), Validators.max(year.getFullYear())]),
      'cena': new FormControl('valid', [Validators.required, Validators.min(1)])
            })
   }

  ngOnInit(): void {
  }
  Submit(){}
  GetTipovi(): Array<string>
  {
    return GetStringValues(TipVozila);
  }
}
