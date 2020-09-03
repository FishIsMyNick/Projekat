import { Component, OnInit } from '@angular/core';
import { RentACar } from '../../../entities/objects/rent-a-car';
import { User } from '../../../entities/users/user/user';
import { AppComponent } from '../../../app.component';
import { RentPrikaz, Meseci, TipVozila } from '../../../_enums';
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

  SortForm: FormGroup;
  ocene: Array<Ocena>;
  OceneRente: Array<Ocena>;

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

  constructor(private router: Router, private toastr: ToastrService, public fb: FormBuilder, private service: RentService, private serviceO: OcenaService) { }

  ngOnInit(): void {
    this.rente = new Array<any>();
    this.kola = new Array<any>();
    this.currentUser = AppComponent.currentUser;
    this.prikaz = RentPrikaz.listaKompanija;
    this.ocene = new Array<Ocena>();

    var resp = this.service.GetAllRents().subscribe(
      (res:any) => {
        res.forEach(element => {
          element.imgUrl = 'assets/images/RentACar/Kompanije/' + element.naziv.replace(/ /g, '-') + '.jpg';
          this.rente.push(element)
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
  GetCompanyImgUrl(naziv: string){
    return 'assets/images/RentACar/Kompanije/' + naziv.replace(/ /g, '-') + '.jpg';
  }

  test(val){
    console.debug(val)
  }

  prikaziListu(){
    this.prikaz = RentPrikaz.listaKompanija;
  }

  async prikaziRentu(naziv: string = '') {
    console.debug('prikaziRentu')
    if(naziv !== ''){
      this.rente.forEach(element => {
        if(element.naziv === naziv){
          this.sr = element;
        }
      });
    }

    this.kola = await this.service.GetCarsFromRent(this.sr.naziv);
    this.filtriranaKola = this.kola;
    this.filtriranaKola.forEach(element => element.imgURL = 'assets/images/RentACar/Kola/' + element.naziv + '.jpg');
    this.sr.prosecnaOcena = await this.service.ProsecnaOcenaRente(this.sr);

    this.prikaz = RentPrikaz.kompanija;
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
}
