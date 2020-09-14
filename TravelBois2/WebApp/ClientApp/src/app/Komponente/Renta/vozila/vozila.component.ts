import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/users/user/user';
import { AppComponent } from 'src/app/app.component';
import { RentACarAdmin } from 'src/app/entities/users/rent-a-car-admin/rent-a-car-admin';
import { RentService } from 'src/app/shared/rent.service';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { Kola } from 'src/app/entities/objects/kola';
import { TipVozila, VozilaPrikaz, GetStringValues } from '../../../_enums';
import { ToastrService } from 'ngx-toastr';
import { Observable, Observer } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-vozila',
  templateUrl: './vozila.component.html'
})
export class VozilaComponent implements OnInit {
  currentUser: RentACarAdmin;
  kola: Array<any>;
  kompanija: string;
  dodajKola: string;
  editKola: any;
  prikaz: VozilaPrikaz;

  constructor(private servis: RentService, private route: ActivatedRoute, private toastr: ToastrService){}

  async ngOnInit() {
    this.kola = new Array<any>();
    this.currentUser = AppComponent.currentUser as RentACarAdmin;
    this.kompanija = this.route.snapshot.paramMap.get('naziv');
    this.dodajKola = '/dodaj-kola/' + this.kompanija;
    this.prikaz = VozilaPrikaz.Katalog;

    var resp = await this.servis.GetCarsFromAdmin(this.currentUser.userName);
    for(let element of resp) {
      let k = new Kola(element.brojMesta, element.godiste, element.naziv.split('-')[0], element.naziv.split('-')[1], element.tipVozila, element.nazivRente, element.cena, element.brzaRezervacija);
      k.BrzaRezervacijaOd = element.brzaRezervacijaOd;
      k.BrzaRezervacijaDo = element.brzaRezervacijaDo;

      element.imgURL = 'assets/images/RentACar/Kola/' + element.naziv + '.jpg';
      this.kola.push(element)
    }
    console.debug(this.kola);
  }

  EditCar(eventName) { 
    this.prikaz = VozilaPrikaz.Kola;
    this.editKola = this.GetCar(eventName);
    let naziv = this.editKola.naziv.split('-');
    this.editKola.marka = naziv[0];
    this.editKola.model = naziv[1];
    this.servis.InitEditCarForm(this.editKola);
  }

  async Save(naziv) {
    var kola; // kola odabrana za izmenu
    for (let k of this.kola) {
      if (k.naziv == naziv) {
        kola = k;
        break;
      }
    }
    kola.brojMesta = (<HTMLInputElement>document.getElementById('brojMesta')).value
    kola.godiste = (<HTMLInputElement>document.getElementById('godiste')).value
    kola.cena = (<HTMLInputElement>document.getElementById('cena')).value
    kola.brzaRezervacija = (<HTMLInputElement>document.getElementById('brzaRezervacija')).checked;

    let rezOd = (<HTMLInputElement>document.getElementById('brzaRezervacijaOd')).value
    if (rezOd == ''){
      rezOd = '1/1/2020'
    }
    kola.brzaRezervacijaOd = rezOd;

    let rezDo = (<HTMLInputElement>document.getElementById('brzaRezervacijaDo')).value
    if (rezDo == ''){
      rezDo = '1/1/2020'
    }

    kola.brzaRezervacijaDo = rezDo;

    kola.tipVozila =(<HTMLInputElement>document.getElementById('tip')).value

    
    var ret = await this.servis.UpdateCar(kola);

    this.toastr.success('Uspesno ste izmenili automobil: ' + ret.naziv.split('-')[0] + ' ' + ret.naziv.split('-')[1] + '!');
    this.kola = await this.servis.GetCarsFromAdmin(AppComponent.currentUser.userName);
    this.prikaz = VozilaPrikaz.Katalog;
  }

  async DeleteCar(naziv) {
    let kola = this.GetCar(naziv);
    let resp: boolean = await this.servis.DeleteCar(kola);
    if (resp) {
      this.toastr.success('Uspesno ste obrisali kola ' + kola.naziv.split('-')[0] + ' ' + kola.naziv.split('-')[1] + '!');
      this.ngOnInit();
    }
    else {
      this.toastr.error('Postoje rezervacije za kola ' + kola.naziv.split('-')[0] + ' ' + kola.naziv.split('-')[1] + '!');
    }
  }

  GetCar(name){
    var id = name.split('+');
    for (let i of this.kola) {
      if (i.naziv == id[0] && i.nazivRente == id[1])
        return i;
    }
  }

  Nazad(){
    this.ngOnInit();
    this.prikaz = VozilaPrikaz.Katalog;
  }

  //helpers
  
  GetTip(tip: number) {
    return TipVozila[tip];
  }
  GetTipovi() : Array<string> {
    return GetStringValues(TipVozila);
  }
}
