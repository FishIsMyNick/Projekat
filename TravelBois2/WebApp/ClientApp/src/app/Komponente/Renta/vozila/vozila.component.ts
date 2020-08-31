import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/users/user/user';
import { AppComponent } from 'src/app/app.component';
import { RentACarAdmin } from 'src/app/entities/users/rent-a-car-admin/rent-a-car-admin';
import { RentService } from 'src/app/shared/rent.service';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { Kola } from 'src/app/entities/objects/kola';
import { TipVozila } from '../../../_enums';

@Component({
  selector: 'app-vozila',
  templateUrl: './vozila.component.html'
})
export class VozilaComponent implements OnInit {
  currentUser: RentACarAdmin;
  kola: Array<any> = new Array<any>();
  kompanija: string;
  dodajKola: string;

  constructor(private servis: RentService, private route: ActivatedRoute) { 
    
  }

  async ngOnInit() {
    this.currentUser = AppComponent.currentUser as RentACarAdmin;
    this.kompanija = this.route.snapshot.paramMap.get('naziv');
    this.dodajKola = '/dodaj-kola/' + this.kompanija;

    var resp = await this.servis.GetCarsFromAdmin(this.currentUser.userName);
    resp.forEach(element => {
      let k = new Kola(element.brojMesta, element.godiste, element.naziv.split('-')[0], element.naziv.split('-')[1], element.tipVozila, element.nazivRente, element.cena, element.brzaRezervacija);

      element.imgURL = 'assets/images/RentACar/Kola/' + element.naziv + '.jpg';
      this.kola.push(element)
    });
    console.debug(this.kola);
  }

  EditCar() { }

  //helpers

  GetTip(tip: number) {
    return TipVozila[tip];
  }
}
