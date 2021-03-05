import { Component, OnInit } from '@angular/core';
import { RentACar } from '../../../entities/objects/rent-a-car';
import { User } from '../../../entities/users/user/user';
import { AppComponent } from '../../../app.component';
import { RentPrikaz, Meseci, TipVozila, GetStringValues } from '../../../_enums';
import { Kola } from '../../../entities/objects/kola';
import { Datum } from '../../../entities/misc/datum';
import { AnyTxtRecord } from 'dns';
import { NavigationEnd, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Ocena } from 'src/app/entities/misc/ocena';
import { RentService } from 'src/app/shared/rent.service';
import { OcenaService } from 'src/app/shared/ocena.service';
import { KalendarComponent } from 'src/app/Helpers/kalendar/kalendar.component';
import { ToastrService } from 'ngx-toastr';
import { Filijala } from '../../../entities/objects/filijala';
import { latLng, tileLayer, map } from 'leaflet';
import { MapService } from '../../../shared/map.service';
import { GeoCodingServiceService } from '../../../shared/geo-coding-service.service';

@Component({
  selector: 'app-rent-a-car',
  templateUrl: './sve-rente.component.html'
})
export class SveRenteComponent implements OnInit {
  rente: Array<any>;
  kola: Array<any>;
  currentUser: User;
  prikaz: RentPrikaz;
  danaUMesecu: number;
  sr: any;
  sc: any;
  filtriranaKola: Array<any> = new Array<any>();
  ocena: any;
  filijale: Array<any>;

  //kalendar
  startDate: any;
  settable: boolean;

  SortForm: FormGroup;
  ocene: Array<Ocena>;
  OceneRente: Array<Ocena>;
  today: Date;

  lokacijeFilijala: Array<string>;

  //filtriranje
  invalidDateOd: boolean;
  invalidDateDo: boolean;
  passedDateOd: boolean;
  passedDateDo: boolean;
  badDateOrder: boolean;

  fMestoOd: string;
  fDatumOd: Date;
  fDatumDo: Date;
  fTip: string;
  fBrPutnika: number;
  fMinCena: number;
  fMaxCena: number;
  filtrirano: boolean;

  // Mapa
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 7,
    center: latLng([ 46.879966, -121.726909 ])
  };


  // 
  static sd1: Date = new Date(1970, 1, 1);
  static sd2: Date = new Date(1970, 1, 1);

  //ZA CSS
  klasaContainer: string = 'kompanija-slika';
  klasaKolaGrid: string = 'kola-ikonica';
  klasaKolaSlika: string = 'kola-slika';
  tipKola: string = 'RentACar/Kola'
  tipKompanija: string = 'RentACar/Kompanije'

  testUrl: string = 'assets/images/RentACar/Kompanije/Car-2-Go.jpg';

  //filtriranje kompanija
  fInvalidDateOd: boolean;
  fInvalidDateDo: boolean;
  fPassedDateOd: boolean;
  fPassedDateDo: boolean;
  fBadDateOrder: boolean;
  odDan: number;
  odMesec: number;
  odGodina: number;
  doDan: number;
  doMesec: number;
  doGodina: number;
  fNazivKompanije: string;

  constructor(private router: Router, private toastr: ToastrService, public fb: FormBuilder, private service: RentService, private serviceO: OcenaService, private mapService: MapService, private geoService: GeoCodingServiceService) { }

  async ngOnInit() {
    this.InitFilter();
    this.settable = true;

    this.rente = new Array<any>();
    this.kola = new Array<any>();
    this.currentUser = AppComponent.currentUser;
    this.prikaz = RentPrikaz.listaKompanija;
    this.ocene = new Array<Ocena>();
    this.filtriranaKola = new Array<any>();

    this.invalidDateDo = false;
    this.invalidDateOd = false;
    this.passedDateOd = false;
    this.passedDateDo = false;
    this.badDateOrder = false;

    let today = new Date();
    this.fDatumOd = new Date();
    this.ZeroDate(this.fDatumOd);
    this.fDatumDo = new Date();
    this.ZeroDate(this.fDatumDo);
    this.odDan = today.getDate();
    this.odMesec = today.getMonth() + 1;
    this.odGodina = today.getFullYear();
    this.doDan = today.getDate();
    this.doMesec = today.getMonth() + 1;
    this.doGodina = today.getFullYear();
    this.fNazivKompanije = '';
    this.fMestoOd = 'Sve';


    var rente = await this.service.GetAllRents();
    for(let element of rente) {
      element.imgUrl = 'assets/images/RentACar/Kompanije/' + element.naziv.replace(/ /g, '-') + '.jpg';
      element.prosecnaOcena = await this.service.ProsecnaOcenaRente(element);
      this.rente.push(element)
    }

    this.lokacijeFilijala = new Array<string>();
    this.filijale = new Array<any>();
    let fil = new Array<any>();
    for(let r of rente){
      for(let f of await this.service.GetFilijale(r.adminID)){
        f.naziv = r.naziv;
        f.opis = r.opis;
        f.imgUrl = r.imgUrl;
        f.prosecnaOcena = 1;
        fil.push(f)
        if(!this.lokacijeFilijala.includes(f.grad)){
          this.lokacijeFilijala.push(f.grad);
        }
      }
    }
    this.filijale = Array.from(fil);
  }

  async InitFilter(){
    this.filtrirano = false;
    this.today = new Date();
    this.ZeroDate(this.today);
    this.fDatumOd = new Date();
    this.fDatumDo = new Date();
    this.fTip = 'Sva';
    this.fBrPutnika = 0;
    this.fMinCena = 0;
    this.fMaxCena = 0;
    this.startDate = '';
  }

  async PretraziKompanije(returning: boolean = false){
    let dateOk = true;
    var dateOd;
    var dateDo;
    this.fBadDateOrder = false;

    if(!returning){
      this.fInvalidDateOd = false;
      this.fPassedDateOd = false;
      this.fDatumOd = this.fCheckDate(true);

      this.fPassedDateDo = false;
      this.fInvalidDateDo = false;
      this.fDatumDo = this.fCheckDate(false);

      this.fNazivKompanije = (<HTMLInputElement>document.getElementById('pretraga-kompanija')).value;
      this.fMestoOd = (<HTMLInputElement>document.getElementById('pretraga-kompanija-lokacija')).value;
    }

    //provera dal je dobar datum
    if(!(this.fDatumOd))
      dateOk = false;
    if(!(this.fDatumDo))
      dateOk = false;
    if(this.fDatumDo < this.fDatumOd){
      dateOk = false;
      this.fBadDateOrder = true;
    }
    if(dateOk){
      //filter naziva
      if(this.fNazivKompanije == ''){
        this.rente = new Array<any>();
        for(let element of await this.service.GetAllRents()) {
          element.imgUrl = 'assets/images/RentACar/Kompanije/' + element.naziv.replace(/ /g, '-') + '.jpg';
          element.prosecnaOcena = await this.service.ProsecnaOcenaRente(element);
          this.rente.push(element)
        }
      }
      else {
        let nRente = new Array<any>();
        for (let element of this.rente) {
          if (element.naziv.toLowerCase().includes(this.fNazivKompanije.toLowerCase())) {
            element.imgUrl = 'assets/images/RentACar/Kompanije/' + element.naziv.replace(/ /g, '-') + '.jpg';
            element.prosecnaOcena = await this.service.ProsecnaOcenaRente(element);
            nRente.push(element);
          }
        }
        this.rente = Array.from(nRente);
        let filijale = new Array<any>();
        for(let r of this.rente){
          for(let f of await this.service.GetFilijale(r.adminID)){
            f.naziv = r.naziv;
            f.imgUrl = r.imgUrl;
            f.opis = r.opis;
            f.prosecnaOcena = 1;
            filijale.push(f);
          }
        }
        this.filijale = Array.from(filijale);
      }
      //filter lokacije
      if(this.fMestoOd == 'Sve'){
        let filijale = new Array<any>();
        for(let r of this.rente){
          for(let f of await this.service.GetFilijale(r.adminID)){
            f.naziv = r.naziv;
            f.imgUrl = r.imgUrl;
            f.opis = r.opis;
            f.prosecnaOcena = 1;
            filijale.push(f);
          }
        }
        this.filijale = Array.from(filijale);
      }
      else {
        let filijale = new Array<any>();
        for (let r of this.rente){
          for(let f of await this.service.GetFilijale(r.adminID)){
            if(f.grad == this.fMestoOd){
              f.naziv = r.naziv;
              f.imgUrl = r.imgUrl;
              f.opis = r.opis;
              f.prosecnaOcena = 1;
              filijale.push(f);
            }
          }
        }
        this.filijale = Array.from(filijale);
      }
      //filtriranje po datumu
      let fil = new Array<any>();
      for(let f of this.filijale){
        for(let k of await this.service.GetKolaFilijale(f.naziv, f.id)){
          let overlapped = false;
          for(let z of await this.service.GetZauzetost(k)){
            if(this.IsOverlapping(new Date(z.od), new Date(z.do), this.fDatumOd, this.fDatumDo)){
              overlapped = true;
              break;
            }
          }
          if(!overlapped){
            fil.push(f);
            break;
          }
        }
      }
      this.filijale = Array.from(fil);
    }
  }

  fCheckDate(od: boolean = false): Date {
    let today = new Date();
    this.ZeroDate(today);
    if(od){
      this.fInvalidDateOd = false;
      this.fPassedDateOd = false;
    }
    else{
      this.fInvalidDateDo = false;
      this.fPassedDateDo = false;
    }

    var dan;
    var mesec;
    var godina;

    if(od){
      dan = (<HTMLInputElement>document.getElementById('odDan')).value;
      mesec = (<HTMLInputElement>document.getElementById('odMesec')).value;
      godina = (<HTMLInputElement>document.getElementById('odGodina')).value;
    }
    else {
      dan = (<HTMLInputElement>document.getElementById('doDan')).value;
      mesec = (<HTMLInputElement>document.getElementById('doMesec')).value;
      godina = (<HTMLInputElement>document.getElementById('doGodina')).value;
    }
    
    if(dan == '' || mesec == '' || godina == ''){
      if(od)
        this.fInvalidDateOd = true;
      else
        this.fInvalidDateDo = true;
      return null;
    }

    let timestamp = Date.parse(mesec + '/' + dan + '/' + godina);

    if(isNaN(timestamp)){
      if(od)
        this.fInvalidDateOd = true;
      else
        this.fInvalidDateDo = true;
      return null;
    }
    else{
      let datum = new Date(Number(godina), Number(mesec) - 1, 1);
      let DuM = this.CalcDanaUMesecu(datum);
      if(Number(dan) > DuM){
        if(od)
          this.fInvalidDateOd = true;
        else
          this.fInvalidDateDo = true;
        return null;
      }
      else{
        datum.setDate(Number(dan));
        if(datum < today){
          if(od)
            this.fPassedDateOd = true;
          else
            this.fPassedDateDo = true;
          return null;
        }
        else {
          if(od)
            this.fInvalidDateOd = false;
          else
            this.fInvalidDateDo = false;
          return new Date(datum);
        }
      }
    }
  }
  // NE KORISTI SE
  //
  // async OnFilijalaChanged(name){
  //   if(name == 'Sve filijale'){
  //     this.kola = await this.service.GetKolaFilijale(this.sr.naziv);
  //   }
  //   else{
  //     name = name.split('.')[0];
  //     let f = this.filijale[Number(name) - 1];
  //     this.kola = await this.service.GetKolaFilijale(this.sr.naziv, f.id);
  //   }

  //   this.filtriranaKola = new Array<any>();
  //   for (let k of this.kola) {
  //     if (!k.brzaRezervacija) {
  //       this.filtriranaKola.push(k);
  //     }
  //   }
  //   this.filtriranaKola.forEach(element => element.imgURL = 'assets/images/RentACar/Kola/' + element.naziv + '.jpg');
  // }


  async PrimeniFilter() {
    this.filtrirano = true;
    this.fMestoOd = (<HTMLInputElement>document.getElementById('mestoOd')).value;
    this.fDatumOd = this.CheckDate(true);
    this.fDatumDo = this.CheckDate(false);
    this.fTip = (<HTMLInputElement>document.getElementById('tip')).value;
    this.fBrPutnika = Number((<HTMLInputElement>document.getElementById('brPutnika')).value);
    this.fMinCena = Number((<HTMLInputElement>document.getElementById('minCena')).value);
    this.fMaxCena = Number((<HTMLInputElement>document.getElementById('maxCena')).value);

    this.startDate = this.fDatumOd;
    KalendarComponent.s1 = this.fDatumOd;
    KalendarComponent.s2 = this.fDatumDo;

    //console.debug(mestoOd, datumOd, mestoDo, datumDo, tip, brPutnika, minCena, maxCena)
    this.Filtriranje();
  }
  async Filtriranje(){
    if (this.fDatumOd != null && this.fDatumDo != null){
      let error = false;
      this.passedDateOd = false;
      this.passedDateDo = false;
      this.badDateOrder = false;

      if(this.fDatumOd < this.today){
        this.passedDateOd = true;
        error = true;
      }
      if(this.fDatumDo < this.today){
        this.passedDateDo = true;
        error = true;
      }
      if(!error){
        if(this.fDatumDo < this.fDatumOd){
          this.badDateOrder = true;
        }
        else{ 
          // Primeni filter
          this.filtriranaKola = new Array<any>();
          for(let k of this.kola){
            if(!k.brzaRezervacija){
              k.prosecnaOcena = await this.service.ProsecnaOcenaKola(k);
              for(let element of this.filijale) {
                if(element.id == k.filijala){
                  k.grad = element.grad;
                  break;
                }
              }
              this.filtriranaKola.push(k);
            }
          }
          this.filtriranaKola.forEach(element => element.imgURL = 'assets/images/RentACar/Kola/' + element.naziv + '.jpg');
          // do ovde radi

          // filtriranje grada
          if(this.fMestoOd == 'Sve'){

          }
          else {
            let prosla = new Array<any>();  
            for (let element of this.filtriranaKola) {
              if(element.grad == this.fMestoOd)
                prosla.push(element)
            }
            this.filtriranaKola = Array.from(prosla);
          }

          let prosla = new Array<any>();  

          if(this.fBrPutnika > 0){ //filtriranje broja putnika
            prosla = new Array<any>();
            for(let k of this.filtriranaKola){
              if(k.brojMesta == this.fBrPutnika){
                prosla.push(k);
              }
            }
            this.filtriranaKola = Array.from(prosla);
          }

          
          if(this.fTip != 'Sva') { //filtriranje tipa
            prosla = new Array<any>();
            for(let k of this.filtriranaKola){
              if(k.tipVozila == this.fTip)
                prosla.push(k);
            }
            this.filtriranaKola = Array.from(prosla);
          }

          prosla = new Array<any>(); //filtriranje zauzetosti
          for(let k of this.filtriranaKola){
            let rez = await this.service.GetZauzetost(k);
            let slobodna = true;
            for(let r of rez){
              if(this.IsOverlapping(this.fDatumOd, this.fDatumDo, new Date(r.od), new Date(r.do))){
                slobodna = false;
                break;
              }
            }
            if(slobodna){
              prosla.push(k);
            }
          }
          this.filtriranaKola = Array.from(prosla);

          //filtriranje min cene
          if(this.fMinCena != 0){
            prosla = new Array<any>();
            for(let k of this.filtriranaKola){
              if(k.cena >= this.fMinCena)
                prosla.push(k);
            }
            this.filtriranaKola = Array.from(prosla);
          }
          
          //filtriranje max cene
          if(this.fMaxCena != 0){
            prosla = new Array<any>();
            for(let k of this.filtriranaKola){
              if(k.cena <= this.fMaxCena)
                prosla.push(k);
            }
            this.filtriranaKola = Array.from(prosla);
          }
        }
        
        this.filtriranaKola.forEach(element => {
          element.cenaRez = element.cena * (((this.fDatumDo.getTime() - this.fDatumOd.getTime()) / 86400000) + 1)
        });
      }

    }
  }
  IsOverlapping(range1Start: Date, range1End: Date, range2Start: Date, range2End: Date = null): boolean{
    if (range2End == null)
      range2End = range2Start;

    if(range1Start <= range2Start && range1End >= range2Start){
      return true;
    }
    else if(range2Start <= range1Start && range2End >= range1Start){
      return true;
    }
    else
      return false;
  }
  CheckDate(od: boolean = false): Date {
    if(od)
      this.invalidDateOd = false;
    else
      this.invalidDateDo = false;

    var dan;
    var mesec;
    var godina;

    if(od){
      dan = (<HTMLInputElement>document.getElementById('selDanOd')).value;
      mesec = (<HTMLInputElement>document.getElementById('selMesecOd')).value;
      godina = (<HTMLInputElement>document.getElementById('selGodinaOd')).value;
    }
    else {
      dan = (<HTMLInputElement>document.getElementById('selDanDo')).value;
      mesec = (<HTMLInputElement>document.getElementById('selMesecDo')).value;
      godina = (<HTMLInputElement>document.getElementById('selGodinaDo')).value;
    }

    if(dan == '' && mesec == '' && godina == ''){
      return new Date();
    }
    else if(dan == '' || mesec == '' || godina == ''){
      if(od)
        this.invalidDateOd = true;
      else
        this.invalidDateDo = true;
      return null;
    }

    let timestamp = Date.parse(mesec + '/' + dan + '/' + godina);

    if(isNaN(timestamp)){
      if(od)
        this.invalidDateOd = true;
      else
        this.invalidDateDo = true;
      return null;
    }
    else{
      let datum = new Date(Number(godina), Number(mesec) - 1, 1);
      let DuM = this.CalcDanaUMesecu(datum);
      if(Number(dan) > DuM){
        if(od)
          this.invalidDateOd = true;
        else
          this.invalidDateDo = true;
        return null;
      }
      else{
        if(od)
          this.invalidDateOd = false;
        else
          this.invalidDateDo = false;

        datum.setDate(Number(dan));
        return datum;
      }
    }
  }
  CalcDanaUMesecu(date: Date): number{
    if(date.getMonth() === 1){
      if(date.getFullYear() % 4 === 0){
        return 29;
      }
      else{
        return 28;
      }
    }
    else if(date.getMonth() <= 6){
      if(date.getMonth() % 2 !== 0){
        return 30;
      }
      else{
        return 31;
      }
    }
    else{
      if(date.getMonth() % 2 !== 0){
        return 31;
      }
      else{
        return 30;
      }
    }
  }
  GetCurrentUserType(){
    return this.currentUser.tipKorisnika;
  }
  GetCompanyImgUrl(naziv: string){
    return 'assets/images/RentACar/Kompanije/' + naziv.replace(/ /g, '-') + '.jpg';
  }

  test(val){
    console.debug(val)
  }

  // Prikazuje listu renti
  async prikaziListu(){
    await this.PretraziKompanije(true);
    
    this.prikaz = RentPrikaz.listaKompanija;
    this.InitFilter();
  }

  async prikaziRentu(naziv: string = '') {
    if(naziv != ''){
      this.rente.forEach(element => {
        if(element.naziv == naziv){
          this.sr = element;
        }
      });
    }

    //preuzimanje lokacije drugih filijala iste rente
    this.filijale = await this.service.GetFilijale(this.sr.adminID);
    this.lokacijeFilijala = new Array<string>();
    this.filijale.forEach(element => {
      this.lokacijeFilijala.push(element.grad);
    });
    if(this.fMestoOd == '' || this.fMestoOd == null)
      this.fMestoOd = this.lokacijeFilijala[0];

    // Mapa

    // var lok = new Array<any>();
    this.filijale.forEach(element => {
      if (element.grad == this.fMestoOd) {
        var adresa = element.adresa + ', ' + element.grad + ', ' + element.drzava;
        this.geoService.checkAddress(adresa).subscribe(
          (res) =>{
            if(res){
              var latlon = this.geoService.LatLon(adresa);
              console.debug(latlon);
            }
          }
        )
      }
    });
    

    this.kola = await this.service.GetCarsFromRent(this.sr.naziv);
    // this.filtriranaKola = new Array<any>();
    // for(let k of this.kola){
    //   if(!k.brzaRezervacija){
    //     k.prosecnaOcena = await this.service.ProsecnaOcenaKola(k);
    //     for(let element of this.filijale) {
    //       if(element.id == k.filijala){
    //         k.grad = element.grad;
    //         break;
    //       }
    //     }
    //     k.cenaRez = k.cena;
    //     this.filtriranaKola.push(k);
    //   }
    // }
    // this.filtriranaKola.forEach(element => element.imgURL = 'assets/images/RentACar/Kola/' + element.naziv + '.jpg');

    this.prikaz = RentPrikaz.kompanija;
    //if(this.filtrirano){
      this.Filtriranje();
    //}

    this.sr.prosecnaOcena = await this.service.ProsecnaOcenaRente(this.sr);
  }
  async prikaziKola(k){
    this.sc = k;
    this.sc.zauzetost = await this.service.GetZauzetost(this.sc);
    this.sc.marka = k.naziv.split('-')[0];
    this.sc.model = k.naziv.split('-')[1];
    this.sc.prosecnaOcena = await this.service.ProsecnaOcenaKola(this.sc);
    this.prikaz = RentPrikaz.kola;
  }
  NapraviRezervaciju() {
    let d1 = KalendarComponent.s1
    let d2 = KalendarComponent.s2
    let today = new Date();
    if(d1 > today && d2 > today){
      this.service.AddReservation(d1, d2, this.sc, this.currentUser.userName).subscribe(
        (res: any) => {
          this.toastr.success("Uspesno ste napravili rezervaciju!");
          this.router.navigate(['/pocetna']);
        },
        err => {
          console.debug(err);
        }
      )
    }
    else{
      this.toastr.error('Ne mozete praviti rezervacije za protekle dane!');
    }
  }
  Oceni(){
    this.prikaz = RentPrikaz.ocenjivanje;
  }
  async PosaljiOcenu() {
    var renta = await this.service.GetRentByName(this.sr.naziv)
    var uspeo = await this.service.OceniRentu(renta.naziv, this.ocena.toString(), this.currentUser.userName);
    if (uspeo) {
      this.toastr.success('Uspesno ste ocenili servis');
      this.router.navigate(['/pocetna']);
    }
    else {
      this.toastr.error('Vec ste ocenili ovaj servis');
    }
  }
  Nazad() {
    this.prikaz = RentPrikaz.kompanija;
  }
  ocenaChanged(value){
    this.ocena = value;
  }
  // helpers
  GetTip(tip) {
    return TipVozila[tip];
  }
  GetTipovi() : Array<string> {
    return GetStringValues(TipVozila);
  }
  ZeroDate(date: Date){
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
  }
}
