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
// import { latLng, tileLayer, icon } from 'leaflet';
// import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { RentMapComponent } from '../rent-map/rent-map.component';
import { Observable } from 'rxjs';

//declare var ol: any;

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
  map: any;

  lat: number;
  lon: number;

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
  mapAddress: string;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, public fb: FormBuilder, private service: RentService, private serviceO: OcenaService) {
  }

  async ngOnInit() {
    this.mapAddress = '44,Jurija Gagarina,Beograd';
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
    for (let element of rente) {
      element.imgUrl = 'assets/images/RentACar/Kompanije/' + element.naziv.replace(/ /g, '-') + '.jpg';
      element.prosecnaOcena = await this.service.ProsecnaOcenaRente(element);
      this.rente.push(element)
    }

    this.lokacijeFilijala = new Array<string>();
    this.filijale = new Array<any>();
    let fil = new Array<any>();
    for (let r of rente) {
      for (let f of await this.service.GetFilijale(r.adminID)) {
        f.naziv = r.naziv;
        f.opis = r.opis;
        f.imgUrl = r.imgUrl;
        f.prosecnaOcena = 1;
        fil.push(f)
        if (!this.lokacijeFilijala.includes(f.grad)) {
          this.lokacijeFilijala.push(f.grad);
        }
      }
    }
    this.filijale = Array.from(fil);
    console.log(this.filijale)
  }

  //Mapa
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  // async initMap(lokFilijale: string[]) {
  //   console.log('initMap')
  //   console.log(lokFilijale)
  //   this.addressLookup(lokFilijale[0]);
  //   //await this.addAllPoints(lokFilijale);

  //   //this.resetMap();
  // }

  // async addAllPoints(formAddressList: Array<any>): Promise<any> {
  //   var searchList = new Array<any>();

  //   for (let i = 0; i < formAddressList.length; i++) {
  //     console.log(i, formAddressList[i])
  //     var splited = formAddressList[i].split(",", 3);
  //     var houseNumber = (splited[0]).replace(' ', '%20');
  //     var street = (splited[1]).replace(' ', '%20');
  //     var city = (splited[2]).replace(' ', '%20');

  //     var location = 'street=' + houseNumber + '+' + street + '&city=' + city;
  //     var search = 'http://nominatim.openstreetmap.org/search?format=json&' + location;
  //     searchList.push(search);
  //   }
  //   console.log('search list', searchList)
  //   for (let i = 0; i < searchList.length; i++) {
  //     await this.getCoordsFromAddress(searchList[i])
  //   }
  // }

  // async getCoordsFromAddress(search: string): Promise<any> {
  //   var latLon = '';
  //   this.http.get(search, { responseType: 'text' }).subscribe(
  //     (res: any) => {
  //       console.log('res')
  //       console.log(res)
  //       res = JSON.parse(res);
  //       latLon += res[0].lat + '|' + res[0].lon;
  //       console.log('latLon', latLon)
  //       this.addPoint(res[0].lat, res[0].lon)
  //     },
  //     err => {
  //       console.log(err)
  //     }
  //   );
  //   return latLon;
  // }

  // addressLookup(formatedAddress: string): void {
  //   console.log('addressLookup(): ', formatedAddress);
  //   if (formatedAddress.charAt(0) === ",") {
  //     formatedAddress = formatedAddress.substring(1, formatedAddress.length - 1);
  //   }
  //   var splited = formatedAddress.split(",", 3);
  //   var houseNumber = (splited[0]).replace(' ', '%20');
  //   var street = (splited[1]).replace(' ', '%20');
  //   var city = (splited[2]).replace(' ', '%20');

  //   var location = 'street=' + houseNumber + '+' + street + '&city=' + city;
  //   var search = 'http://nominatim.openstreetmap.org/search?format=json&' + location;
  //   console.log(search);

  //   this.http.get(search, { responseType: 'text' }).subscribe(
  //     (res: any) => {
  //       res = JSON.parse(res);
  //       console.log(res);

  //       // RentMapComponent.lon = 0;
  //       // RentMapComponent.lat = 0;
  //       // RentMapComponent.lon = res[0].lon;
  //       // RentMapComponent.lat = res[0].lat;
  //       //console.log(RentMapComponent.lat, RentMapComponent.lon);

  //       this.defineMap(res[0].lon, res[0].lat);
  //     }
  //   );
  // }
  // defineMap(longitude: any, latitude: any) {
  //   this.map = new ol.Map({
  //     target: 'map',
  //     layers: [
  //       new ol.layer.Tile({
  //         source: new ol.source.OSM()
  //       })
  //     ],
  //     view: new ol.View({
  //       center: ol.proj.fromLonLat([longitude - 0.00, latitude - 0.00]),
  //       zoom: 15
  //     })
  //   });

  //   console.log('kraj def map')
  //   //this.addPoint(latitude - 0.00, longitude - 0.00);
  // }
  // addPoint(lat: number, lng: number) {
  //   console.log('addPoint lat, lon: ', lat, lng)
  //   var vectorLayer = new ol.layer.Vector({
  //     source: new ol.source.Vector({
  //       features: [new ol.Feature({
  //         geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
  //       })]
  //     }),
  //     style: new ol.style.Style({
  //       image: new ol.style.Icon({
  //         anchor: [0.5, 0.5],
  //         anchorXUnits: "fraction",
  //         anchorYUnits: "pixels",
  //         src: 'http://maps.gstatic.com/intl/de_de/mapfiles/ms/micons/red-pushpin.png'
  //       })
  //     })
  //   });

  //   this.map.addLayer(vectorLayer);
  // }

  // static resetMap() {
  //   var element = document.getElementById("map");
  //   console.log(element)
  //   element.parentNode.removeChild(element);
  //   var node = document.createElement("div");
  //   node.setAttribute("id", "map");
  //   node.setAttribute("style", "height: 400px;");
  //   var parent = document.getElementById("destory1");
  //   parent.appendChild(node);
  // }

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  async InitFilter() {
    this.filtrirano = false;
    this.today = new Date();
    this.ZeroDate(this.today);
    if(this.fDatumOd == null)
      this.fDatumOd = new Date();
    if(this.fDatumDo == null)
      this.fDatumDo = new Date();
    this.fTip = 'Sva';
    this.fBrPutnika = 0;
    this.fMinCena = 0;
    this.fMaxCena = 0;
    this.startDate = '';
  }

  async PretraziKompanije(returning: boolean = false) {
    let dateOk = true;
    var dateOd;
    var dateDo;
    this.fBadDateOrder = false;
    console.log('PretraziKompanije(): returning: ', returning)

    if (!returning) {
      this.fInvalidDateOd = false;
      this.fPassedDateOd = false;
      this.fDatumOd = this.fCheckDate(true);

      this.fPassedDateDo = false;
      this.fInvalidDateDo = false;
      this.fDatumDo = this.fCheckDate(false);

      this.fNazivKompanije = (<HTMLInputElement>document.getElementById('pretraga-kompanija')).value;
      this.fMestoOd = (<HTMLInputElement>document.getElementById('pretraga-kompanija-lokacija')).value;
      //console.log('fMestoOd after get: ', this.fMestoOd)
    }
    console.log(this.fDatumOd, this.fDatumDo, this.fMestoOd)

    //provera dal je dobar datum
    if (!(this.fDatumOd))
      dateOk = false;
    if (!(this.fDatumDo))
      dateOk = false;
    if (this.fDatumDo < this.fDatumOd) {
      dateOk = false;
      this.fBadDateOrder = true;
    }
    if (dateOk) {
      //filter naziva
      if (this.fNazivKompanije == '') {
        this.rente = new Array<any>();
        for (let element of await this.service.GetAllRents()) {
          element.imgUrl = 'assets/images/RentACar/Kompanije/' + element.naziv.replace(/ /g, '-') + '.jpg';
          element.prosecnaOcena = await this.service.ProsecnaOcenaRente(element);
          this.rente.push(element)
        }
        console.log('naziv', this.rente)
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
        console.log('naziv', this.rente)
        let filijale = new Array<any>();
        for (let r of this.rente) {
          for (let f of await this.service.GetFilijale(r.adminID)) {
            f.naziv = r.naziv;
            f.imgUrl = r.imgUrl;
            f.opis = r.opis;
            f.prosecnaOcena = 1;
            filijale.push(f);
          }
        }
        this.filijale = Array.from(filijale);
        console.log('filijale', this.filijale)
      }
      //filter lokacije
      if (this.fMestoOd == 'Sve') {
        let filijale = new Array<any>();
        for (let r of this.rente) {
          for (let f of await this.service.GetFilijale(r.adminID)) {
            f.naziv = r.naziv;
            f.imgUrl = r.imgUrl;
            f.opis = r.opis;
            f.prosecnaOcena = 1;
            filijale.push(f);
          }
        }
        this.filijale = Array.from(filijale);
        //console.log('sve filijale: ', this.filijale)
      }
      else {
        let filijale = new Array<any>();
        for (let r of this.rente) {
          for (let f of await this.service.GetFilijale(r.adminID)) {
            if (f.grad == this.fMestoOd) {
              f.naziv = r.naziv;
              f.imgUrl = r.imgUrl;
              f.opis = r.opis;
              f.prosecnaOcena = 1;
              filijale.push(f);
            }
          }
        }
        this.filijale = Array.from(filijale);
        //console.log('odabrana filijala: ', this.filijale)
      }
      //console.log('filter filijale', this.filijale)

      //filtriranje po datumu
      let fil = new Array<any>();
      for (let f of this.filijale) {
        console.log('f', f);
        for (let k of await this.service.GetKolaFilijale(f.naziv, f.id)) {
          let overlapped = false;
          for (let z of await this.service.GetZauzetost(k)) {
            console.log('z', z.od, z.do)
            //console.log('IsOverlapping(z.od, z.do, f.od, f.do)', this.IsOverlapping(new Date(z.od), new Date(z.do), this.fDatumOd, this.fDatumDo))
            if (this.IsOverlapping(new Date(z.od), new Date(z.do), this.fDatumOd, this.fDatumDo)) {
              overlapped = true;
              break;
            }
          }
          if (!overlapped) {
            fil.push(f);
            break;
          }
        }
      }
      this.filijale = Array.from(fil);
      console.log('filter datuma', this.filijale)
      //console.log('filter datum prosao')
    }
  }

  fCheckDate(od: boolean = false): Date {
    let today = new Date();
    this.ZeroDate(today);
    if (od) {
      this.fInvalidDateOd = false;
      this.fPassedDateOd = false;
    }
    else {
      this.fInvalidDateDo = false;
      this.fPassedDateDo = false;
    }

    var dan;
    var mesec;
    var godina;

    if (od) {
      dan = (<HTMLInputElement>document.getElementById('odDan')).value;
      mesec = (<HTMLInputElement>document.getElementById('odMesec')).value;
      godina = (<HTMLInputElement>document.getElementById('odGodina')).value;
    }
    else {
      dan = (<HTMLInputElement>document.getElementById('doDan')).value;
      mesec = (<HTMLInputElement>document.getElementById('doMesec')).value;
      godina = (<HTMLInputElement>document.getElementById('doGodina')).value;
    }

    if (dan == '' || mesec == '' || godina == '') {
      if (od)
        this.fInvalidDateOd = true;
      else
        this.fInvalidDateDo = true;
      return null;
    }

    let timestamp = Date.parse(mesec + '/' + dan + '/' + godina);

    if (isNaN(timestamp)) {
      if (od)
        this.fInvalidDateOd = true;
      else
        this.fInvalidDateDo = true;
      return null;
    }
    else {
      let datum = new Date(Number(godina), Number(mesec) - 1, 1);
      let DuM = this.CalcDanaUMesecu(datum);
      if (Number(dan) > DuM) {
        if (od)
          this.fInvalidDateOd = true;
        else
          this.fInvalidDateDo = true;
        return null;
      }
      else {
        datum.setDate(Number(dan));
        if (datum < today) {
          if (od)
            this.fPassedDateOd = true;
          else
            this.fPassedDateDo = true;
          return null;
        }
        else {
          if (od)
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
    this.resetMap();
  }
  resetMap() {

  }

  async Filtriranje() {
    if (this.fDatumOd != null && this.fDatumDo != null) {
      let error = false;
      this.passedDateOd = false;
      this.passedDateDo = false;
      this.badDateOrder = false;

      if (this.fDatumOd < this.today) {
        this.passedDateOd = true;
        error = true;
      }
      if (this.fDatumDo < this.today) {
        this.passedDateDo = true;
        error = true;
      }
      if (!error) {
        if (this.fDatumDo < this.fDatumOd) {
          this.badDateOrder = true;
        }
        else {
          //console.log('this.Filtriranje() provera datuma ok.')
          // Primeni filter


          this.filtriranaKola = new Array<Kola>();
          // console.log(this.filtriranaKola.length)
          // console.log('this.filtriranaKola pre filter: ', this.filtriranaKola)
          // console.log('for k of this.kola: ')
          for (let k of this.kola) {
            //console.log('k: ', k)
            if (!k.brzaRezervacija) {
              k.prosecnaOcena = await this.service.ProsecnaOcenaKola(k);
              for (let element of this.filijale) {
                if (element.id == k.filijala) {
                  k.grad = element.grad;
                  break;
                }
              }
              this.filtriranaKola.push(k);
            }
          }

          this.filtriranaKola.forEach(element => element.imgURL = 'assets/images/RentACar/Kola/' + element.naziv + '.jpg');
          //console.log('this.filtriranaKola after init: ', this.filtriranaKola)
          // do ovde radi

          // filtriranje grada
          if (this.fMestoOd == 'Sve') {

          }
          else {
            let prosla = new Array<any>();
            for (let element of this.filtriranaKola) {
              if (element.grad == this.fMestoOd)
                prosla.push(element)
            }
            this.filtriranaKola = Array.from(prosla);
            //console.log('this.filtriranaKola after filter grada: ', this.filtriranaKola)
          }

          let prosla = new Array<any>();

          if (this.fBrPutnika > 0) { //filtriranje broja putnika
            prosla = new Array<any>();
            for (let k of this.filtriranaKola) {
              if (k.brojMesta == this.fBrPutnika) {
                prosla.push(k);
              }
            }
            this.filtriranaKola = Array.from(prosla);
            //console.log('this.filtriranaKola after filter br putnika: ', this.filtriranaKola)
          }


          if (this.fTip != 'Sva') { //filtriranje tipa
            prosla = new Array<any>();
            for (let k of this.filtriranaKola) {
              if (k.tipVozila == this.fTip)
                prosla.push(k);
            }
            this.filtriranaKola = Array.from(prosla);
            //console.log('this.filtriranaKola after filter tipa: ', this.filtriranaKola)
          }

          prosla = new Array<any>(); //filtriranje zauzetosti
          for (let k of this.filtriranaKola) {
            let rez = await this.service.GetZauzetost(k);
            let slobodna = true;
            for (let r of rez) {
              if (this.IsOverlapping(this.fDatumOd, this.fDatumDo, new Date(r.od), new Date(r.do))) {
                slobodna = false;
                break;
              }
            }
            if (slobodna) {
              prosla.push(k);
            }
          }
          this.filtriranaKola = Array.from(prosla);
          //console.log('this.filtriranaKola after filter zauzetost: ', this.filtriranaKola)

          //filtriranje min cene
          if (this.fMinCena != 0) {
            prosla = new Array<any>();
            for (let k of this.filtriranaKola) {
              if (k.cena >= this.fMinCena)
                prosla.push(k);
            }
            this.filtriranaKola = Array.from(prosla);
            //console.log('this.filtriranaKola after filter cena min: ', this.filtriranaKola)
          }

          //filtriranje max cene
          if (this.fMaxCena != 0) {
            prosla = new Array<any>();
            for (let k of this.filtriranaKola) {
              if (k.cena <= this.fMaxCena)
                prosla.push(k);
            }
            this.filtriranaKola = Array.from(prosla);
            //console.log('this.filtriranaKola after filter cena max: ', this.filtriranaKola)
          }
        }

        this.filtriranaKola.forEach(element => {
          element.cenaRez = element.cena * (((this.fDatumDo.getTime() - this.fDatumOd.getTime()) / 86400000) + 1)
        });
        //console.log('this.filtriranaKola after cena rezervacije sracunata: ', this.filtriranaKola)
      }

    }
  }
  IsOverlapping(range1Start: Date, range1End: Date, range2Start: Date, range2End: Date = null): boolean {
    if (range2End == null)
      range2End = range2Start;

    if (range1Start <= range2Start && range1End >= range2Start) {
      return true;
    }
    else if (range2Start <= range1Start && range2End >= range1Start) {
      return true;
    }
    else
      return false;
  }
  CheckDate(od: boolean = false): Date {
    if (od)
      this.invalidDateOd = false;
    else
      this.invalidDateDo = false;

    var dan;
    var mesec;
    var godina;

    if (od) {
      dan = (<HTMLInputElement>document.getElementById('selDanOd')).value;
      mesec = (<HTMLInputElement>document.getElementById('selMesecOd')).value;
      godina = (<HTMLInputElement>document.getElementById('selGodinaOd')).value;
    }
    else {
      dan = (<HTMLInputElement>document.getElementById('selDanDo')).value;
      mesec = (<HTMLInputElement>document.getElementById('selMesecDo')).value;
      godina = (<HTMLInputElement>document.getElementById('selGodinaDo')).value;
    }

    if (dan == '' && mesec == '' && godina == '') {
      return new Date();
    }
    else if (dan == '' || mesec == '' || godina == '') {
      if (od)
        this.invalidDateOd = true;
      else
        this.invalidDateDo = true;
      return null;
    }

    let timestamp = Date.parse(mesec + '/' + dan + '/' + godina);

    if (isNaN(timestamp)) {
      if (od)
        this.invalidDateOd = true;
      else
        this.invalidDateDo = true;
      return null;
    }
    else {
      let datum = new Date(Number(godina), Number(mesec) - 1, 1);
      let DuM = this.CalcDanaUMesecu(datum);
      if (Number(dan) > DuM) {
        if (od)
          this.invalidDateOd = true;
        else
          this.invalidDateDo = true;
        return null;
      }
      else {
        if (od)
          this.invalidDateOd = false;
        else
          this.invalidDateDo = false;

        datum.setDate(Number(dan));
        return datum;
      }
    }
  }
  CalcDanaUMesecu(date: Date): number {
    if (date.getMonth() === 1) {
      if (date.getFullYear() % 4 === 0) {
        return 29;
      }
      else {
        return 28;
      }
    }
    else if (date.getMonth() <= 6) {
      if (date.getMonth() % 2 !== 0) {
        return 30;
      }
      else {
        return 31;
      }
    }
    else {
      if (date.getMonth() % 2 !== 0) {
        return 31;
      }
      else {
        return 30;
      }
    }
  }
  GetCurrentUserType() {
    return this.currentUser.tipKorisnika;
  }
  GetCompanyImgUrl(naziv: string) {
    return 'assets/images/RentACar/Kompanije/' + naziv.replace(/ /g, '-') + '.jpg';
  }

  test(val) {
    console.debug(val)
  }

  // Prikazuje listu renti
  async prikaziListu() {
    await this.PretraziKompanije(true);

    this.prikaz = RentPrikaz.listaKompanija;
    this.InitFilter();
  }

  async prikaziFilijalu(id: number) {
    console.log('Prikazi filijalu: ID: ', id)
    //console.log('PRIKAZI FILIJALU')
    //this.fMestoOd = (<HTMLInputElement>document.getElementById('pretraga-kompanija-lokacija')).value;
    //console.log(this.fMestoOd)
    // if (naziv != '') {
    //   this.rente.forEach(element => {
    //     if (element.naziv == naziv) {
    //       this.sr = element;
    //     }
    //   });
    // }
    //console.log(this.sr);

    for (let i = 0; i < this.filijale.length; i++) {
      if (this.filijale[i].id == id) {
        this.sr = this.filijale[i];
        break;
      }
    }
    console.log(this.sr)
    this.filijale = await this.service.GetFilijale(this.sr.adminID);
    //console.log('start PF: sve filijale rente', this.filijale);
    //console.log(this.filijale)
    //console.log(this.fMestoOd, this.filijale)
    this.lokacijeFilijala = new Array<string>();
    this.filijale.forEach(element => {
      if (!this.lokacijeFilijala.includes(element.grad))
        this.lokacijeFilijala.push(element.grad);
    });
    if (this.fMestoOd == '' || this.fMestoOd == null) {
      this.fMestoOd = this.lokacijeFilijala[0];
    }
    //console.log('this.lokacijeFilijala: ', this.lokacijeFilijala);


    //  Lista formatiranih adresa za pretragu
    var formatedAddressSearches = new Array<string>();
    let orderedFormatedAddressSearches = new Array<any>();
    {
      let adresa = this.sr.adresa;
      let len = Array.from(adresa.split(' ')).length
      let broj = adresa.split(' ')[len - 1];
      let ulica = '';
      let j = 0;
      for (let i = 0; i < len - 1; i++) {
        ulica += adresa.split(' ')[i]
        if (i < len - 2)
          ulica += ' ';
      }
      ulica.trimEnd();

      let grad = this.sr.grad;
      adresa = broj + ',' + ulica + ',' + grad;
      orderedFormatedAddressSearches.push(adresa)
    }

    if (this.fMestoOd == 'Sve') {
      //console.log(this.lokacijeFilijala)
      //  Izabran prikaz svih filijala odabranog servisa
      //console.log('fMestoOd = Sve: for element of this.filijale:')
      for (let element of this.filijale) {
        //console.log('element: ', element);
        //if (element.grad == this.lokacijeFilijala[0]) {
        // formatiranje stringa za pretragu adrese
        {
          let adresa = element.adresa;
          let len = Array.from(adresa.split(' ')).length
          let broj = adresa.split(' ')[len - 1];
          let ulica = '';
          let j = 0;
          for (let i = 0; i < len - 1; i++) {
            ulica += adresa.split(' ')[i]
            if (i < len - 2)
              ulica += ' ';
          }
          ulica.trimEnd();

          let grad = element.grad;
          adresa = broj + ',' + ulica + ',' + grad;
          //  String formata: <broj>,<ulica>,<grad>
          formatedAddressSearches.push(adresa);
          //console.log('adresa = ', adresa)
          //console.log('formAddrSrc after push: ', formatedAddressSearshes);
        }
        //}
        ///
        // console.log('fMestoOd = Sve: for 2:')
        // for (let element of this.filijale) {
        //   filijala = element;
        //   console.log('filijala = element', filijala);
        //   break;
        // }
      }
    }
    else {
      //  Izabran prikaz filijala odabranog grada
      //console.log('fMestoOd = <grad>: for element of this.filijale:')
      for (let element of this.filijale) {
        console.log('element.grad ', element.grad)
        //console.log('element: ', element);
        if (element.grad == this.fMestoOd) {
          console.log('formatiranje adrese')
          //  Formatiranje adrese
          {
            let adresa = element.adresa;
            let len = Array.from(adresa.split(' ')).length
            let broj = adresa.split(' ')[len - 1];
            let ulica = '';
            let j = 0;
            for (let i = 0; i < len - 1; i++) {
              ulica += adresa.split(' ')[i]
              if (i < len - 2)
                ulica += ' ';
            }
            ulica.trimEnd();
            //console.log(filijala)
            let grad = element.grad;
            adresa = broj + ',' + ulica + ',' + grad;
            formatedAddressSearches.push(adresa);
            // console.log('element.grad == this.fMestoOd: adresa = ', adresa)
          }
        }
      }
    }
    this.filijale.forEach(e => {
      if (e.id != id) {
        let adresa = e.adresa;
        let len = Array.from(adresa.split(' ')).length
        let broj = adresa.split(' ')[len - 1];
        let ulica = '';
        let j = 0;
        for (let i = 0; i < len - 1; i++) {
          ulica += adresa.split(' ')[i]
          if (i < len - 2)
            ulica += ' ';
        }
        ulica.trimEnd();

        let grad = e.grad;
        adresa = broj + ',' + ulica + ',' + grad;
        orderedFormatedAddressSearches.push(adresa)
      }
    });
    
    console.log('formAddrSrc after init: ', formatedAddressSearches);
    console.log('ordered after Init: ', orderedFormatedAddressSearches);
    // console.log('/////////////////////////////////////////////////////////////////////////////////////')
    // console.log('Pribavljene sve inicijalne filijale')
    // console.log('/////////////////////////////////////////////////////////////////////////////////////')
    this.mapAddress = '';
    for (let i = 0; i < orderedFormatedAddressSearches.length; i++) {
      this.mapAddress += orderedFormatedAddressSearches[i];
      if (i < orderedFormatedAddressSearches.length - 1)
        this.mapAddress += '|'
    }
    // Inicijalizacija mape
    //await this.initMap(lokFilijale);
    //console.log(this.kola)
    this.kola = await this.service.GetCarsFromRent(this.sr.naziv);

    //console.log('Sva kola rente: ', this.kola)

    // Koordinate za mapu

    // let mark = L.marker([ this.lat, this.lon ], {
    //   icon: icon({
    //     iconSize: [ 25, 41 ],
    //     iconAnchor: [ 13, 41 ],
    //     iconUrl: 'leaflet/marker-icon.png',
    //     iconRetinaUrl: 'leaflet/marker-icon-2x.png',
    //     shadowUrl: 'leaflet/marker-shadow.png'
    //   })
    // });
    // let streetMaps = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     detectRetina: true,
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // });
    // this.options = {
    //   layers: [streetMaps, mark],
    //   zoom: 7,
    //   center: latLng([this.lat, this.lon])
    // }

    //if(this.filtrirano){
    //console.log('Poziv this.Filtriranje()')
    this.Filtriranje();
    //console.log('this.fMestoOd: ', this.fMestoOd)
    //}

    this.sr.prosecnaOcena = await this.service.ProsecnaOcenaRente(this.sr);
    //Mora na kraju
    this.prikaz = RentPrikaz.kompanija;
  }


  async prikaziKola(k) {
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
    if (d1 > today && d2 > today) {
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
    else {
      this.toastr.error('Ne mozete praviti rezervacije za protekle dane!');
    }
  }
  Oceni() {
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
  ocenaChanged(value) {
    this.ocena = value;
  }
  // helpers
  GetTip(tip) {
    return TipVozila[tip];
  }
  GetTipovi(): Array<string> {
    return GetStringValues(TipVozila);
  }
  ZeroDate(date: Date) {
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
  }
}

