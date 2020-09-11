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

@Component({
  selector: 'app-vozila',
  templateUrl: './vozila.component.html'
})
export class VozilaComponent implements OnInit {
  currentUser: RentACarAdmin;
  kola: Array<any> = new Array<any>();
  kompanija: string;
  dodajKola: string;
  editKola: any;
  prikaz: VozilaPrikaz;

  constructor(private servis: RentService, private route: ActivatedRoute, private toastr: ToastrService){}

  async ngOnInit() {
    this.currentUser = AppComponent.currentUser as RentACarAdmin;
    this.kompanija = this.route.snapshot.paramMap.get('naziv');
    this.dodajKola = '/dodaj-kola/' + this.kompanija;
    this.prikaz = VozilaPrikaz.Katalog;

    var resp = await this.servis.GetCarsFromAdmin(this.currentUser.userName);
    resp.forEach(element => {
      let k = new Kola(element.brojMesta, element.godiste, element.naziv.split('-')[0], element.naziv.split('-')[1], element.tipVozila, element.nazivRente, element.cena, element.brzaRezervacija);

      element.imgURL = 'assets/images/RentACar/Kola/' + element.naziv + '.jpg';
      this.kola.push(element)
    });
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
  GetCar(name){
    var id = name.split('+');
    for (let i of this.kola) {
      if (i.naziv == id[0] && i.nazivRente == id[1])
        return i;
    }
  }
  Nazad(){
    this.prikaz = VozilaPrikaz.Katalog;
  }
  async Save(marka, model) {
    var kola; // kola odabrana za izmenu
    let naziv = marka + '-' + model;
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
    kola.tipVozila = (<HTMLInputElement>document.getElementById('tip')).value
    let newMarka = (<HTMLInputElement>document.getElementById('marka')).value;
    let newModel = (<HTMLInputElement>document.getElementById('model')).value;

    // Izmenjen naziv kola, moraju da se menjaju i rezervacije
    if (marka != newMarka || model != newModel) {
      
      var ret = await this.servis.ReplaceCar(kola, newMarka, newModel);


      // TODO:
      // izmena slike
    }
    // Nije izmenjen naziv, samo se kola menjaju
    else {
      var ret = await this.servis.UpdateCar(kola);
    }

    this.toastr.success('Uspesno ste izmenili automobil: ' + ret.naziv.split('-')[0] + ' ' + ret.naziv.split('-')[1] + '!');
    this.kola = await this.servis.GetCarsFromAdmin(AppComponent.currentUser.userName);
    this.prikaz = VozilaPrikaz.Katalog;
  }

  //helpers
  
  getBase64ImageFromURL(url: string) { 
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }
  getBase64Image(img: HTMLImageElement) {
    // We create a HTML canvas object that will create a 2d image
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    // This will draw image    
    ctx.drawImage(img, 0, 0);
    // Convert the drawn image to Data URL
    var dataURL = canvas.toDataURL("image/png");
 return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
 }

  GetTip(tip: number) {
    return TipVozila[tip];
  }
  GetTipovi() : Array<string> {
    return GetStringValues(TipVozila);
  }
}
