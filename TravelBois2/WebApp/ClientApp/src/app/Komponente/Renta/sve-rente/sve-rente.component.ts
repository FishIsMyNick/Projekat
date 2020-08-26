import { Component, OnInit } from '@angular/core';
import { RentACar } from '../../../entities/objects/rent-a-car';
import { User } from '../../../entities/users/user/user';
import { AppComponent } from '../../../app.component';
import { RentPrikaz, Meseci } from '../../../_enums';
import { Kola } from '../../../entities/objects/kola';
import { Datum } from '../../../entities/misc/datum';
import { AnyTxtRecord } from 'dns';
import { NavigationEnd, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Ocena } from 'src/app/entities/misc/ocena';
import { RentService } from 'src/app/shared/rent.service';
import { OcenaService } from 'src/app/shared/ocena.service';

@Component({
  selector: 'app-rent-a-car',
  templateUrl: './sve-rente.component.html'
})
export class SveRenteComponent implements OnInit {
  rente: Array<RentACar>;
  sr: RentACar;
  sc: Kola;
  currentUser: User;
  prikaz: RentPrikaz;
  danaUMesecu: number;

  SortForm: FormGroup;
  ocene: Array<Ocena>;
  OceneRente: Array<Ocena>;

  // 
  static sd1: Date = new Date(1970, 1, 1);
  static sd2: Date = new Date(1970, 1, 1);

  //ZA CSS
  klasa: string = 'kompanija-slika';
  klasaKolaGrid: string = 'kola-ikonica';
  klasaKolaSlika: string = 'kola-slika';
  tip: string = 'RentACar/Kola'

  constructor(private router: Router, public fb: FormBuilder, private service: RentService, private serviceO: OcenaService) { 
    this.rente = new Array<RentACar>();
    this.currentUser = AppComponent.currentUser;
    this.prikaz = RentPrikaz.listaKompanija;
    this.ocene = new Array<Ocena>();
  }
  ngOnInit(): void {
    var resp = this.service.GetAllRents().subscribe(
      (res:any) => {
        console.log('dobio sve rente')
        res.forEach(element => {
          this.rente.push(new RentACar(element.naziv, element.adresa))
        });
      },
      (err) =>{
        console.log(err)
      }
    )
  }
  GetCurrentUserType(){
    return this.currentUser.constructor.name;
  }
  test(val){
    console.debug(val)
  }

  prikaziListu(){
    this.prikaz = RentPrikaz.listaKompanija;
  }
  prikaziRentu(naziv: string = ''){
    if(naziv !== ''){
      this.rente.forEach(element => {
        if(element.Naziv === naziv){
          this.sr = element;
        }
      });
    }
    this.prikaz = RentPrikaz.kompanija;
  }
  prikaziKola(k: Kola){
    //console.debug(k.Naziv);
    this.sc = k;
    this.prikaz = RentPrikaz.kola;
  }
}
