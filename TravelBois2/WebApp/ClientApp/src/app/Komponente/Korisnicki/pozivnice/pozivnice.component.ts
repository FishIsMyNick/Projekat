import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pozivnice',
  templateUrl: './pozivnice.component.html',
  styleUrls: ['./pozivnice.component.css']
})
export class PozivniceComponent implements OnInit {
  empty: number;
  letHeaders = ['Mesto polaska', 'Mesto dolaska', 'Datum polaska', 'Datum dolaska', 'Tip leta', 'Klasa', 'Cena'];
  letData: Array<Array<string>>;

  constructor(private location: Location) {
    this.empty = 0;
  }

  ngOnInit(): void {
    this.ucitajPozivnice();
  }

  ucitajPozivnice() { } ///poziv servisu
  OtkaziLet(id: string) {
    var number = parseInt(id);
  }

  onBack() {
    this.location.back();
  }
}