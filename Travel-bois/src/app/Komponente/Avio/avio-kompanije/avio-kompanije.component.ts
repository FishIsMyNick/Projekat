import { Component, OnInit } from '@angular/core';
import { AvioKompanija } from '../../../entities/objects/avio-kompanija';
import { User } from '../../../entities/users/user/user';
import { AppComponent } from '../../../app.component';
import {Location} from '@angular/common'
import { Let } from '../../../entities/objects/let';
import { Kola } from '../../../entities/objects/kola';

@Component({
  selector: 'app-avio-kompanije',
  templateUrl: './avio-kompanije.component.html',
  styleUrls: ['./avio-kompanije.component.css']
})
export class AvioKompanijeComponent implements OnInit {
  kompanije: Array<AvioKompanija>;
  brzeRezervacijeLetova: Array<Let>;
  brzeRezervacijeKola: Array<Kola>;
  currentUser: User;

  //ZA CSS
  klasa: string;
  tip: string;

  constructor(private location:Location) { 
    this.kompanije = new Array<AvioKompanija>();   
    this.brzeRezervacijeKola = new Array<Kola>();
    this.brzeRezervacijeLetova = new Array<Let>(); 
    this.klasa = 'kompanija-slika';
    this.tip = 'AvioKompanije';
  }

  ngOnInit(): void {
    this.currentUser = AppComponent.currentUser;
    this.kompanije.push(new AvioKompanija('Bogdana Suputa 5', 'Jat'));
    this.kompanije.push(new AvioKompanija('Petefi Sandora 9', 'WizzAir'));
  }

  onBack()
  {
    this.location.back();
  }

  getType(){
    return this.currentUser.constructor.name;
  }


}