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

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Filijala } from '../../../entities/objects/filijala';
import { prependListener } from 'process';

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
  ucitaj: boolean = false;
  filijale: Array<Filijala>;
  today: Date;

  //kalendar
  kalendarKola: any;
  kalendarSD: string = '';
  kalendarSettable: boolean = false;

  //profit
  pDan: number;
  pMesec: number;
  pGodina: number;
  prihodi: number;
  pSelectedFilijala: Filijala;
  pNistaSelektovano: boolean;
  periodProfita: string;

  //rezervacije
  rDan: number;
  rMesec: number;
  rGodina: number;
  rezervisanaKola;
  brojRezervacija;

  danaUMesecu: number;
  viewPeriodRezervacije: string;
  periodRezervacije: string;
  selectedDate: Date;
  selectedFilijala: Filijala;
  invalidDate = false;
  nistaSelektovano: boolean;

  //chart
  private danLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24/00'];
  private nedeljaLabels: Label[] = ['Pon', 'Uto', 'Sre', 'Cet', 'Pet', 'Sub', 'Ned'];
  private mesecLabels: Label[];


  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{ticks: {
      max: 10,
      min: 0,
      stepSize: 1
  }}] }
  };
  public barChartLabels: Label[] = this.danLabels;
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Rezervisana kola' }
  ];
  pSelectedDate: Date;
  pInvalidDate: boolean;
  pDanaUMesecu: number;


  constructor(public fb: FormBuilder, private servis: RentService) {}

  async ngOnInit() {
    this.today = new Date();
    this.ZeroDate(this.today);
    this.pDan = this.today.getDate();
    this.pMesec = this.today.getMonth() + 1;
    this.pGodina = this.today.getFullYear();
    this.rDan = this.today.getDate();
    this.rMesec = this.today.getMonth() + 1;
    this.rGodina = this.today.getFullYear();
    
    this.selectedDate = new Date();
    this.selectedDate.setHours(0);
    this.selectedDate.setMinutes(0);
    this.selectedDate.setSeconds(0);
    this.selectedDate.setMilliseconds(0);

    this.selectedFilijala = null;
    this.pSelectedFilijala = null;

    this.prihodi = 0;
    this.periodProfita = 'n';
    this.nistaSelektovano = false;
    this.pNistaSelektovano = false;
    this.currentUser = AppComponent.currentUser as RentACarAdmin;
    this.renta = await this.servis.GetRent(this.currentUser.userName);

    this.ocenaKola = 0;
    this.ocenaServisa = await this.GetOcena();
    this.carNames = await this.GetCarNames();

    this.rezervisanaKola = await this.GetRezervacijeList('n');

    this.kalendarKola = new Kola(0, 0, '', '', 'Hecbek', 'renta', 0, 0);
    this.kalendarKola.zauzetost.push(new Zauzetost(new Date(1970, 1, 1), new Date(1970, 1, 1), '', '', 0, ''));
    this.ucitaj = true;

    this.filijale = await this.servis.GetFilijale(this.currentUser.userName);

    //chart
    this.MakeMonthLabels(new Date())
    await this.RezervacijeChanged('d');

    let data = this.barChartData[0].data as number[];
    this.barChartOptions = {
      responsive: true,
      scales: { xAxes: [{}], yAxes: [{ticks: {
        max: Math.max(...data),
        min: 0,
        stepSize: 1
    }}] }
    };
  }

  async OnFilijalaProfitChanged(name){
    if(name == 'Sve filijale'){
      this.pSelectedFilijala = null;
    }
    else{
      name = name.split('.')[0];
      this.pSelectedFilijala = this.filijale[Number(name) - 1];
    }
  }
  async ProfitChanged(event) {
    this.periodProfita = event.charAt(1).toLowerCase();
  }
  async IzracunajPrihode() {
      let suma = 0;
      let filijale = new Array<Filijala>();
      let kola = new Array<any>();
      if(this.pCheckDate()){
        if(this.pSelectedFilijala == null){
          filijale = Array.from(this.filijale);
        }
        else {
          filijale.push(this.pSelectedFilijala);
        }

        for(let f of filijale){
          for(let k of await this.servis.GetKolaFilijale(this.renta.naziv, f.id)){
            kola.push(k);
          }
        }

        // pocetak i kraj odabranog perioda
        var start;
        var end;
        if(this.periodProfita == 'n'){
          start = this.GetNedeljaRezervacije(this.pSelectedDate);

          end = new Date(start);
          end.setDate(end.getDate() + 6)
        }
        else if(this.periodProfita == 'm'){
          start = new Date(this.pSelectedDate);
          start.setDate(1);

          end = new Date(start);
          end.setDate(this.pDanaUMesecu);
        }
        else{
          start = new Date(this.pSelectedDate);
          start.setDate(1);
          start.setMonth(0);
                
          end = new Date(start);
          end.setDate(31);
          end.setMonth(11);
        }

        let rezervacije = new Array<any>();
        for(let k of kola){
          for(let r of await this.servis.GetZauzetost(k)){
            let doDate = new Date(r.do);
            this.ZeroDate(doDate);
            doDate.setHours(1);
            if( doDate < this.today){
              // Ako je u periodu prihoda dodaj sumi cena*dana
              let dana = this.GetOverlappingInDays(start, end, new Date(r.od), new Date(r.do));
              if(r.brzaRezervacija){
                if(r.user != '__BR__')
                  suma += dana * k.cenaBrzeRezervacije;
              }
              else {
                suma += dana * k.cena;
              }
            }
          }
        }

        this.prihodi = suma;
      }

  }

  async OnFilijalaChanged(name){
    if(name == 'Sve filijale'){
      this.selectedFilijala = null;
      await this.UpdateGraph(this.periodRezervacije);
    }
    else{
      name = name.split('.')[0];
      this.selectedFilijala = this.filijale[Number(name) - 1];
      await this.UpdateGraph(this.periodRezervacije);
    }
  }
  pCheckDate(): boolean {
    let dan = (<HTMLInputElement>document.getElementById('pSelDan')).value;
    let mesec = (<HTMLInputElement>document.getElementById('pSelMesec')).value;
    let godina = (<HTMLInputElement>document.getElementById('pSelGodina')).value;

    if(dan == '' || mesec == '' || godina == ''){
        this.pInvalidDate = true;
      return false;
    }

    let timestamp = Date.parse(mesec + '/' + dan + '/' + godina);

    if(isNaN(timestamp)){
      this.pInvalidDate = true;
      return false;
    }
    else{
      let datum = new Date(Number(godina), Number(mesec) - 1, 1);
      this.pCalcDanaUMesecu(datum)
      if(Number(dan) > this.pDanaUMesecu){
        this.pInvalidDate = true;
        return false;
      }
      else{
        this.pInvalidDate = false;
        datum.setDate(Number(dan));
        this.pSelectedDate = new Date(datum);
        return true;
      }
    }
  }
  
  CheckDate(): boolean {
    let dan = (<HTMLInputElement>document.getElementById('selDan')).value;
    let mesec = (<HTMLInputElement>document.getElementById('selMesec')).value;
    let godina = (<HTMLInputElement>document.getElementById('selGodina')).value;

    if(dan == '' && mesec == '' && godina == ''){
      this.selectedDate = new Date();
      this.RezervacijeChanged(this.periodRezervacije);
      return true;
    }
    else if(dan == '' || mesec == '' || godina == ''){
        this.invalidDate = true;
      return false;
    }

    let timestamp = Date.parse(mesec + '/' + dan + '/' + godina);

    if(isNaN(timestamp)){
      this.invalidDate = true;
      return false;
    }
    else{
      let datum = new Date(Number(godina), Number(mesec) - 1, 1);
      this.CalcDanaUMesecu(datum)
      if(Number(dan) > this.danaUMesecu){
        this.invalidDate = true;
        return false;
      }
      else{
        this.invalidDate = false;
        datum.setDate(Number(dan));
        this.selectedDate = new Date(datum);
        this.RezervacijeChanged(this.periodRezervacije);
        return true;
      }
    }
  }
  
  async UpdateGraph(period: string) {
    let rezervacije = await this.GetRezervacije(this.periodRezervacije);
    let fRezervacije = new Array<any>();
    if (this.selectedFilijala == null) {
      fRezervacije = rezervacije;
    }
    else {
      rezervacije.forEach(element => {
        if (element.filijala == this.selectedFilijala.id) {
          if(element.user != '__BR__')
            fRezervacije.push(element);
        }
      });
    }

    // Izabran dan
    if (this.periodRezervacije == 'd'){
      let date = new Date(this.selectedDate);
      let danas = new Date();
        if (date.getDate() == danas.getDate() 
          && date.getMonth() == danas.getMonth() 
          && date.getFullYear() == danas.getFullYear())
          this.viewPeriodRezervacije = 'danas';
        else 
          this.viewPeriodRezervacije = 'ovog dana';
        this.barChartLabels = this.danLabels;

        let data = new Array<number>(24).fill(0);

        fRezervacije.forEach(element => {
          if(this.IsOverlapping(new Date(element.od), new Date(element.do), this.selectedDate)){
            data[this.Random(23)]++;
          }
        });
        this.barChartData[0].data = data;
    }
    // Izabrana nedelja
    else if(this.periodRezervacije == 'n'){
      this.barChartLabels = this.nedeljaLabels;

      let start = this.GetNedeljaRezervacije(this.selectedDate);

      let data = new Array<number>(7).fill(0);

      let max = new Date(start);
      max.setDate(max.getDate() + 6)

      let i = 0;
      for (let s = start; s <= max; s.setDate(s.getDate() + 1), i++){
        fRezervacije.forEach(element => {
          if(this.IsOverlapping(new Date(element.od) , new Date(element.do), s)){
            data[i]++;
          }
        });
      }

      this.barChartData[0].data = data;
    }
    // Izabran mesec
    else {
      this.MakeMonthLabels(this.selectedDate);
      this.barChartLabels = this.mesecLabels;

      let data = new Array<number>(this.danaUMesecu).fill(0);

      let start = new Date(this.selectedDate);
      start.setDate(1);
      let max = new Date(start);
      max.setDate(this.danaUMesecu);

      let i = 0;
      for (let s = start; s <= max; s.setDate(s.getDate() + 1), i++){
        fRezervacije.forEach(element => {         
          if(this.IsOverlapping(new Date(element.od) , new Date(element.do), s)){
            data[i]++;
          }
        });
      }

      this.barChartData[0].data = data;
    }

    let data = this.barChartData[0].data as number[];
    this.barChartOptions = {
      responsive: true,
      scales: {
        xAxes: [{}], yAxes: [{
          ticks: {
            max: Math.max(...data),
            min: 0,
            stepSize: 1
          }
        }]
      }
    };
  }
  // Radio button raspona pregleda rezervacija menja izgled grafa
  async RezervacijeChanged(event) {
    this.periodRezervacije = event.charAt(0);

    this.brojRezervacija = 0;
    let rezervacije = await this.GetRezervacije(this.periodRezervacije); // Sve rezervacije pronadjene u izabranom periodu
    this.rezervisanaKola = new Array<string>();
    for (let r of rezervacije) {
      if(r.user != '__BR__')
        this.brojRezervacija++;
        if (!this.rezervisanaKola.includes(r.kola)) {
          this.rezervisanaKola.push(r.kola);
        }
    }
    
    this.UpdateGraph(this.periodRezervacije);
  }

  GetNedeljaRezervacije(date: Date): Date{
    let start = new Date(date);
      let dan = date.getDay();
      //nedelja
      if (dan == 0) {
        start.setDate(start.getDate() - 6);
      }
      // ponedeljak
    if (dan == 1) {
        // nista
      }
      // utorak
      if (dan == 2) {
        start.setDate(start.getDate() - 1)
      }
      // sreda
      if (dan == 3) {
        start.setDate(start.getDate() - 2)
      }
      // cetvrtak
      if (dan == 4) {
        start.setDate(start.getDate() - 3)
      }
      // petak
      if (dan == 5) {
        start.setDate(start.getDate() - 4)
      }
      // subota
      if (dan == 6) {
        start.setDate(start.getDate() - 5)
      }
      return start;
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
    var start, end : Date;
    let date = new Date(this.selectedDate);
    let danas = new Date();
    if (period == 'd'){
      if (date.getDate() == danas.getDate() 
        && date.getMonth() == danas.getMonth() 
        && date.getFullYear() == danas.getFullYear())
        this.viewPeriodRezervacije = 'danas';
      else 
        this.viewPeriodRezervacije = 'ovog dana';

      start = date;
      end = date;
    }
    else if (period == 'n') {
      this.viewPeriodRezervacije = 'ove nedelje';
      start = this.GetNedeljaRezervacije(date);
      end = new Date(start);
      end.setDate(end.getDate() + 6);
    }
    else if (period == 'm') {
      this.viewPeriodRezervacije = 'ovog meseca';
      date.setDate(1);
      start = new Date(date);
      date.setMonth(date.getMonth() + 1);
      date.setDate(0);
      end = new Date(date);
    }
    else {
      console.debug('greska u preuzimanju rezervacija: Izvestaj-O-Poslovanju')
    }
    // Potencijalno dodati funkcionalnost odabira filijale
    let ret = new Array<Zauzetost>();
    for (let kola of await this.GetCars()) {
      for (let z of await this.servis.GetZauzetost(kola)) {
        if(z.user != '__BR__')
          if (this.IsOverlapping(start, end, new Date(z.od), new Date(z.do))) {
            ret.push(z);
          }
      }
    }
    return ret;
  }

  
  GetOverlappingInDays(range1Start: Date, range1End: Date, range2Start: Date, range2End: Date): number{
    if(this.IsOverlapping(range1Start, range1End, range2Start, range2End)){
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
      return Math.ceil(Math.abs(start.getTime() - end.getTime()) / (1000 * 3600 * 24)) + 1;
    }
    else 
    return 0;
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
  
  //Helpers
  MakeMonthLabels(date: Date){
    this.mesecLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];
    this.CalcDanaUMesecu(date);
    for(let i = 29; i <= this.danaUMesecu; i++){
      this.mesecLabels.concat(i.toString())
    }
  }

  CalcDanaUMesecu(date: Date){
    if(date.getMonth() === 1){
      if(date.getFullYear() % 4 === 0){
        this.danaUMesecu = 29;
      }
      else{
        this.danaUMesecu = 28;
      }
    }
    else if(date.getMonth() <= 6){
      if(date.getMonth() % 2 !== 0){
        this.danaUMesecu = 30;
      }
      else{
        this.danaUMesecu = 31;
      }
    }
    else{
      if(date.getMonth() % 2 !== 0){
        this.danaUMesecu = 31;
      }
      else{
        this.danaUMesecu = 30;
      }
    }
  }
  pCalcDanaUMesecu(date: Date){
    if(date.getMonth() === 1){
      if(date.getFullYear() % 4 === 0){
        this.pDanaUMesecu = 29;
      }
      else{
        this.pDanaUMesecu = 28;
      }
    }
    else if(date.getMonth() <= 6){
      if(date.getMonth() % 2 !== 0){
        this.pDanaUMesecu = 30;
      }
      else{
        this.pDanaUMesecu = 31;
      }
    }
    else{
      if(date.getMonth() % 2 !== 0){
        this.pDanaUMesecu = 31;
      }
      else{
        this.pDanaUMesecu = 30;
      }
    }
  }
  Random(max, min = 1) {
    return Math.round(Math.random() * (max - min) + min);
  }
  ZeroDate(date: Date){
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
  }
}
