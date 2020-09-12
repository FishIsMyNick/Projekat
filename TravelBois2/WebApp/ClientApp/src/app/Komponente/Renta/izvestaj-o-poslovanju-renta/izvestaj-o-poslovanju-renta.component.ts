import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { RentACarAdmin } from 'src/app/entities/users/rent-a-car-admin/rent-a-car-admin';
import { Kola } from 'src/app/entities/objects/kola';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DodajKolaComponent } from '../dodaj-kola/dodaj-kola.component';
import { RentService } from 'src/app/shared/rent.service';
import { TipVozila } from 'src/app/_enums';
import { Zauzetost } from 'src/app/entities/misc/zauzetost';

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

  constructor(public fb: FormBuilder, private servis: RentService) {}

  async ngOnInit() {
    this.currentUser = AppComponent.currentUser as RentACarAdmin;
    this.renta = await this.servis.GetRent(this.currentUser.userName);

    this.ocenaKola = 0;
    this.ocenaServisa = await this.GetOcena();
    this.carNames = await this.GetCarNames();

    this.kalendarKola = new Kola(0, 0, '', '', 'Hecbek');
    this.kalendarKola.zauzetost.push(new Zauzetost(new Date(1970, 1, 1), new Date(1970, 1, 1), '', '', ''));
    this.ucitaj = true;

    this.DateForm = new FormGroup({
      'odDan': new FormControl(this.date.getDate(), [Validators.required, Validators.min(1), Validators.max(31)]),
      'doDan':new FormControl(this.date.getDate(), [Validators.required, Validators.min(1), Validators.max(31)]),
      'odMon':new FormControl(this.date.getMonth() + 1, [Validators.required, Validators.min(1), Validators.max(12)]),
      'doMon':new FormControl(this.date.getMonth() + 1, [Validators.required, Validators.min(1), Validators.max(12)]),
      'odGod':new FormControl(this.date.getFullYear(), [Validators.required, Validators.min(1970), Validators.max(this.date.getFullYear())]),
      'doGod':new FormControl(this.date.getFullYear(), [Validators.required, Validators.min(1970), Validators.max(this.date.getFullYear())]),
      'suma': new FormControl(0, [])
    })
  }

  async IzracunajPrihode(){
    let odDan = this.DateForm.get('odDan').value;
    let odMon = this.DateForm.get('odMon').value;
    let odGod = this.DateForm.get('odGod').value;
    let doDan = this.DateForm.get('doDan').value;
    let doMon = this.DateForm.get('doMon').value;
    let doGod = this.DateForm.get('doGod').value;
    let start = new Date(odGod, odMon - 1, odDan);
    let end = new Date(doGod, doMon - 1, doDan);
    end.setTime(end.getTime() + 100);
    var suma = 0;

    for(let kola of await this.GetCars()){
      kola.zauzetost.forEach(termin =>{
        //console.debug(kola.Naziv, termin[0], termin[1])
        if(this.IsOverlapping(start, end, termin[0], termin[1])){
          suma += this.GetOverlappingInDays(start, end, termin[0], termin[1]) * kola.cena;          
        }
      })
    }
    this.DateForm.get('suma').setValue(suma);
    console.debug(odDan, odMon, odGod, doDan, doMon, doGod)
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
  SelectCar(){}
}
