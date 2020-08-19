import { Component, OnInit } from '@angular/core';
import { RentACarAdmin } from 'src/app/entities/users/rent-a-car-admin/rent-a-car-admin';
import { Kola } from 'src/app/entities/objects/kola';
import { AppComponent } from 'src/app/app.component';
import { RentPrikaz } from 'src/app/_enums';

@Component({
  selector: 'app-raspolozivost-vozila',
  templateUrl: './raspolozivost-vozila.component.html'
})
export class RaspolozivostVozilaComponent implements OnInit {
  cu: RentACarAdmin;
  sc: Kola;

  prikaz: RentPrikaz;

  tip = 'RentACar/Kola';
  klasa = 'kola-ikonica';
  klasaKolaSlika = 'kola-slika';
  constructor() { }

  ngOnInit(): void {
    this.prikaz = RentPrikaz.kompanija;
    this.cu = AppComponent.currentUser as RentACarAdmin;
  }
  prikaziKola(k: Kola){
    //console.debug(k.Naziv);
    this.sc = k;
    this.prikaz = RentPrikaz.kola;
  }
  back(){
    this.prikaz = RentPrikaz.kompanija;
  }
}
