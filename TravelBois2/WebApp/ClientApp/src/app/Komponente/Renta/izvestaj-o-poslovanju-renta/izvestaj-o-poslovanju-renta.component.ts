import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { RentACarAdmin } from 'src/app/entities/users/rent-a-car-admin/rent-a-car-admin';
import { Kola } from 'src/app/entities/objects/kola';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DodajKolaComponent } from '../dodaj-kola/dodaj-kola.component';
import { RentService } from 'src/app/shared/rent.service';
import { TipVozila } from 'src/app/_enums';
import { Zauzetost } from 'src/app/entities/misc/zauzetost';
import { KalendarComponent } from '../../../Helpers/kalendar/kalendar.component';

@Component({
  selector: 'app-izvestaj-o-poslovanju-renta',
  templateUrl: './izvestaj-o-poslovanju-renta.component.html'
})
export class IzvestajOPoslovanjuRentaComponent implements OnInit {
  currentUser: RentACarAdmin;
  CarSelectForm: FormGroup;
  DateForm: FormGroup;
  ocenaKola: number;
  ocenaServisa: number;
  carNames: Array<string>;
  date: Date = new Date();
  renta: any;
  kalendarKola: any;
  ucitaj: boolean = false;
  prihodi: number;
  nistaSelektovano: boolean;
  periodRezervacije: string;
  rezervisanaKola;
  brojRezervacija;

  constructor(public fb: FormBuilder, private servis: RentService) {}

  async ngOnInit() {
    this.prihodi = 0;
    this.nistaSelektovano = false;
    this.currentUser = AppComponent.currentUser as RentACarAdmin;
    this.renta = await this.servis.GetRent(this.currentUser.userName);

    this.ocenaKola = 0;
    this.ocenaServisa = await this.GetOcena();
    this.carNames = await this.GetCarNames();

    this.rezervisanaKola = await this.GetRezervacijeList('n');

    this.kalendarKola = new Kola(0, 0, '', '', 'Hecbek', 'renta', 0, 0);
    this.kalendarKola.zauzetost.push(new Zauzetost(new Date(1970, 1, 1), new Date(1970, 1, 1), '', '', ''));
    this.ucitaj = true;
  }

  async GetRezervacijeList(period) {
    this.brojRezervacija = 0;
    let rez = await this.GetRezervacije(period);
    let list = new Array<string>();
    for (let r of rez) {
      this.brojRezervacija++;
      if (!list.includes(r.kola)) {
        list.push(r.kola);
      }
    }
    return list;
  }
  async GetRezervacije(period) {
    var start, end;
    let date = new Date();
    if (period == 'n') {
      this.periodRezervacije = 'ove nedelje';
      let dan = date.getDay();
      //nedelja
      if (dan == 0) {
        date.setDate(date.getDate() - 6)
        start = new Date(date);
        date.setDate(date.getDate() + 6);
        end = new Date(date);
      }
      // ponedeljak
      if (dan == 1) {
        start = new Date(date);
        date.setDate(date.getDate() + 6);
        end = new Date(date);
      }
      // utorak
      if (dan == 2) {
        date.setDate(date.getDate() - 1)
        start = new Date(date);
        date.setDate(date.getDate() + 6);
        end = new Date(date);
      }
      // sreda
      if (dan == 3) {
        date.setDate(date.getDate() - 2)
        start = new Date(date);
        date.setDate(date.getDate() + 6);
        end = new Date(date);
      }
      // cetvrtak
      if (dan == 4) {
        date.setDate(date.getDate() - 3)
        start = new Date(date);
        date.setDate(date.getDate() + 6);
        end = new Date(date);
      }
      // petak
      if (dan == 5) {
        date.setDate(date.getDate() - 4)
        start = new Date(date);
        date.setDate(date.getDate() + 6);
        end = new Date(date);
      }
      // subota
      if (dan == 6) {
        date.setDate(date.getDate() - 5)
        start = new Date(date);
        date.setDate(date.getDate() + 6);
        end = new Date(date);
      }
    }
    else if (period == 'm') {
      this.periodRezervacije = 'ovog meseca';
      date.setDate(1);
      start = new Date(date);
      date.setMonth(date.getMonth() + 1);
      date.setDate(0);
      end = new Date(date);
    }
    else if (period == 'g') {
      this.periodRezervacije = 'ove godine';
      date.setDate(1);
      date.setMonth(0);
      start = new Date(date);
      date.setFullYear(date.getFullYear() + 1);
      end = new Date(date);
    }

    let ret = new Array<Zauzetost>();
    for (let kola of await this.GetCars()) {
      for (let z of await this.servis.GetZauzetost(kola)) {
        if (this.IsOverlapping(start, end, new Date(z.od), new Date(z.do))) {
          ret.push(z);
        }
      }
    }
    return ret;
  }

  async IzracunajPrihode() {
    if (KalendarComponent.s1 == null && KalendarComponent.s2 == null) {
      this.nistaSelektovano = true;
      this.prihodi = 0;
    }
    else {
      this.nistaSelektovano = false;
      let start = new Date(KalendarComponent.s1);
      let end = new Date(KalendarComponent.s2);
      if (KalendarComponent.s1 == null) {
        start = new Date(KalendarComponent.s2);
      }
      if (start == null)
        start = end;
      end.setTime(end.getTime() + 100);
      var suma = 0;
      for (let kola of await this.GetCars()) {
        for (let termin of await this.servis.GetZauzetost(kola)) {
          termin.od = new Date(termin.od);
          termin.do = new Date(termin.do);
          if (this.IsOverlapping(start, end, termin.od, termin.do)) {
            suma += this.GetOverlappingInDays(start, end, termin.od, termin.do) * kola.cena;
          }
        }
      }
      this.prihodi = suma;
    }
  }
  GetOverlappingInDays(range1Start: Date, range1End: Date, range2Start: Date, range2End: Date): number{
    var start: Date;
    var end: Date;

    if(range1Start.getTime() <= range2Start.getTime()){
      start = range2Start;
      if(range1End.getTime() <= range2End.getTime()){
        end = range1End;
      }
      else{
        end = range2End;
      }
    }
    else{
      start = range1Start;
      if(range1End.getTime() <= range2End.getTime()){
        end = range1End;
      }
      else{
        end = range2End;
      }
    }
    return Math.ceil(Math.abs(start.getTime() - end.getTime()) / (1000 * 3600 * 24));
  }
  IsOverlapping(range1Start: Date, range1End: Date, range2Start: Date, range2End: Date): boolean{
    if(range1Start <= range2Start && range1End >= range2Start){
      return true;
    }
    else if(range2Start <= range1Start && range2End >= range1Start){
      return true;
    }
    else
      return false;
  }
  async GetOcena(){
    return await this.servis.ProsecnaOcenaRente(this.renta)
  }
  async GetCarNames(){
    let kola = await this.servis.GetCarsFromAdmin(this.currentUser.userName);
    let nazivi = new Array<string>();
    for(let k of kola){
      nazivi.push(k.naziv)
    }
    return nazivi;
  }
  async GetCars(){
    return await this.servis.GetCarsFromAdmin(this.currentUser.userName);
  }
  async CarChanged(selection) {
    let kola = await this.servis.GetKola(selection, this.renta.naziv);
    this.ocenaKola = await this.servis.ProsecnaOcenaKola(kola);
  }
  async RezervacijeChanged(event) {
    this.rezervisanaKola = await this.GetRezervacijeList(event.charAt(0));
  }
}
