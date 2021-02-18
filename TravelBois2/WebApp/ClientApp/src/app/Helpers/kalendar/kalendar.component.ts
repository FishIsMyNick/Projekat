import { Component, OnInit, Input } from '@angular/core';
import { Kola } from '../../entities/objects/kola';
import { Datum } from '../../entities/misc/datum';
import { RentService } from '../../shared/rent.service';
import { TipVozila } from '../../_enums';

@Component({
  selector: 'kalendar',
  templateUrl: './kalendar.component.html'
})
export class KalendarComponent implements OnInit {
  @Input() kola: any;

  datum: Datum;
  static s1: Date;
  static s2: Date;

  static sd: Date;
  static sp: string;

  private sdStart: Date;
  private sdEnd: Date;

  dateUnavailable: boolean;
  nistaSelektovano: boolean;
  test = '';
  //zauzetost: any;

  constructor(private servis: RentService) { 
  }

  ngOnInit() {
    this.datum = new Datum(this.datum)
    this.dateUnavailable = false;
    KalendarComponent.s1 = null;
    KalendarComponent.s2 = null;
  }

  static Update(){
  }

  IsToday(dan, mesec, godina){
    return this.DateCmp(this.datum.today, new Date(godina, mesec, dan));
  }
  IsAvalable(day, month, year){
    let date = new Date(year, month, day);
    let ret = true;
    for(let element of this.kola.zauzetost) {
      element.od = new Date(element.od);
      element.do = new Date(element.do);
      if(date >= element.od && date <= element.do){
        ret = false;
      }
    }
    return ret;
  }
  IsSelected(dan, mesec, godina){
    let temp = new Date(godina, mesec, dan);
    let s1 = KalendarComponent.s1;
    let s2 = KalendarComponent.s2;
    var ret;
    if(s1 !== null && s2 !== null){
      if(s1 > s2){
        ret = (s1 >= temp && temp >= s2);
      }
      else{
        ret = (s2 >= temp && temp >= s1);
      }
    }
    else if(s2 !== null){
      ret = this.DateCmp(temp, s2);
    }
    else{
      //console.debug('ispalo iz provere')
      ret = false;
    }
    return ret;
  }

  IsOverlapping(temp: Date) {
    // Ako ni jedan datum jos nije selektovan nema provere preklapanja
    if(KalendarComponent.s2 === null){
      return false;
    }
    // Jedan je vec selektovan, da li ce selekcija sledeceg dati preklapanje?
    else {
      // temp je uvek pocetna vrednost iteracije a tempLimit je granica
      let newSelection = new Date(temp)
      let limit = new Date(temp);
      if(newSelection < KalendarComponent.s2){
        limit = new Date(KalendarComponent.s2);
      }
      else{
        newSelection = new Date(KalendarComponent.s2);
      }
      // Da li postoji preklapanje sa zauzetim datumima?
      for(; newSelection < limit; newSelection.setDate(newSelection.getDate() + 1)){
        if(!this.IsAvalable(newSelection.getDate(), newSelection.getMonth(), newSelection.getFullYear())){
          // Postoji, prekini sve sto radis i odjebi
          return true;
        }
      }
      // Ne postoji, cepaj
      return false;
    } 
  }

  UmanjiMesec(){
    this.datum.UmanjiMesec();
    this.ngOnInit();
  }
  UvecajMesec(){
    this.datum.UvecajMesec();
    this.ngOnInit();
  }

  Select(dan, mesec, godina) {
    this.dateUnavailable = false;
    let temp = new Date(godina, mesec, dan);
    let s1 = KalendarComponent.s1;
    let s2 = KalendarComponent.s2;

    // Da li je odabrani datum vec selektovan
    if(!(this.DateCmp(temp, s1) || this.DateCmp(temp, s2))){
       if(this.IsOverlapping(temp)){
         this.dateUnavailable = true;
       }
       else{
        s1 = s2;
        s2 = temp;
      }
    }
    KalendarComponent.s1 = s1;
    KalendarComponent.s2 = s2;
  }
  
  DateCmp(d1: Date, d2: Date){
    if(d1 === null || d2 === null)
      return false;
    if(d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear())
      return true;
    return false;
  }
  Reset(){
    KalendarComponent.s1 = null;
    KalendarComponent.s2 = null;
    this.dateUnavailable = false;
  }
  GetS1() { return KalendarComponent.s1; }
  GetS2() { return KalendarComponent.s2; }
  public SelectOn(){}

  // Helpers
  GetNedeljaRezervacije(): void{
    this.sdStart = new Date(KalendarComponent.sd);
    let dan = this.sdStart.getDay();
    //nedelja
    if (dan == 0) {
      this.sdStart.setDate(this.sdStart.getDate() - 6);
    }
    // ponedeljak
    if (dan == 1) {
        // nista
    }
    // utorak
    if (dan == 2) {
      this.sdStart.setDate(this.sdStart.getDate() - 1)
    }
    // sreda
    if (dan == 3) {
      this.sdStart.setDate(this.sdStart.getDate() - 2)
    }
    // cetvrtak
    if (dan == 4) {
      this.sdStart.setDate(this.sdStart.getDate() - 3)
    }
    // petak
    if (dan == 5) {
      this.sdStart.setDate(this.sdStart.getDate() - 4)
    }
    // subota
    if (dan == 6) {
      this.sdStart.setDate(this.sdStart.getDate() - 5)
    }
    this.sdEnd = new Date(this.sdStart);
    this.sdEnd.setDate(this.sdEnd.getDate() + 6);
  }
  GetMesecRezervacije(): void {
    this.sdStart = new Date(KalendarComponent.sd);
    this.sdStart.setDate(1);
    this.sdEnd = new Date(this.sdStart);
    let d = new Datum();
    d.SetDay(this.sdEnd.getDate());
    d.SetMonth(this.sdEnd.getMonth());
    d.SetYear(this.sdEnd.getFullYear());
    this.sdEnd.setDate(this.sdEnd.getDate() + d.danaUMesecu);
  }
}
