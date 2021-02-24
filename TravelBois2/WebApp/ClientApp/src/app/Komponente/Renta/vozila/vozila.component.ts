import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/users/user/user';
import { AppComponent } from 'src/app/app.component';
import { RentACarAdmin } from 'src/app/entities/users/rent-a-car-admin/rent-a-car-admin';
import { RentService } from 'src/app/shared/rent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { Kola } from 'src/app/entities/objects/kola';
import { TipVozila, VozilaPrikaz, GetStringValues } from '../../../_enums';
import { ToastrService } from 'ngx-toastr';
import { Observable, Observer } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { KalendarComponent } from '../../../Helpers/kalendar/kalendar.component';

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

  kalendarKola: Kola;
  invalidBR: boolean = false;

  constructor(private router: Router,  private servis: RentService, private route: ActivatedRoute, private toastr: ToastrService){}

  async ngOnInit() {
    this.kola = new Array<any>();
    this.currentUser = AppComponent.currentUser as RentACarAdmin;
    this.kompanija = this.route.snapshot.paramMap.get('naziv');
    this.dodajKola = '/dodaj-kola/' + this.kompanija;
    this.prikaz = VozilaPrikaz.Katalog;

    this.kalendarKola = new Kola(5, 5, '', '', '', '', 0, 0, 0);

    var resp = await this.servis.GetCarsFromAdmin(this.currentUser.userName);
    for(let element of resp) {
      let k = new Kola(element.brojMesta, element.godiste, element.naziv.split('-')[0], element.naziv.split('-')[1], element.tipVozila, element.nazivRente, element.cena, element.filijala);
      

      element.imgURL = '/assets/images/RentACar/Kola/' + element.naziv + '.jpg';
      this.kola.push(element)
    }
  }

  async BrzaRezervacija(name){
    let s = name.split('+');
    this.kalendarKola = await this.servis.GetKola(s[0], s[1]) as Kola;
    this.kalendarKola.zauzetost = await this.servis.GetZauzetost(this.kalendarKola);

    this.prikaz = 3;
  }
  DodajBrzuRezervaciju(){
    let d1 = KalendarComponent.s1
    let d2 = KalendarComponent.s2
    let today = new Date();
    if(d1 > today && d2 > today){
      this.servis.AddReservation(d1, d2, this.kalendarKola, this.currentUser.userName, true).subscribe(
        (res: any) => {
          this.toastr.success("Uspesno ste napravili brzu rezervaciju!");
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
    kola.cenaBrzeRezervacije = (<HTMLInputElement>document.getElementById('cenaBrzeRezervacije')).value;


    kola.tipVozila =(<HTMLInputElement>document.getElementById('tip')).value

    
    var ret = await this.servis.UpdateCar(kola);

    this.toastr.success('Uspesno ste izmenili automobil: ' + ret.naziv.split('-')[0] + ' ' + ret.naziv.split('-')[1] + '!');
    // this.kola = await this.servis.GetCarsFromAdmin(AppComponent.currentUser.userName);
    // this.prikaz = VozilaPrikaz.Katalog;
    this.ngOnInit();
  }

  async DeleteCar(naziv) {
    let kola = this.GetCar(naziv);
    let resp: number = await this.servis.DeleteCar(kola);
    if (resp == 0) {
      this.toastr.success('Uspesno ste obrisali kola ' + kola.naziv.split('-')[0] + ' ' + kola.naziv.split('-')[1] + '!');
      this.ngOnInit();
    }
    else if (resp == -1) {
      this.toastr.error('Postoje rezervacije za kola ' + kola.naziv.split('-')[0] + ' ' + kola.naziv.split('-')[1] + '!');
    }
    else if (resp == -2) {
      this.toastr.error('Doslo je do greske u brisanju slike za kola ' + kola.naziv.split('-')[0] + ' ' + kola.naziv.split('-')[1] + '!');
    }
    else if (resp == -3) {
      this.toastr.error('Doslo je do greske u brisanju kola ' + kola.naziv.split('-')[0] + ' ' + kola.naziv.split('-')[1] + '!');
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
