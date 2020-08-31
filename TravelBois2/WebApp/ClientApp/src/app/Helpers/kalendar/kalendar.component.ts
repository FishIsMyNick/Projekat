import { Component, OnInit, Input } from '@angular/core';
import { Kola } from '../../entities/objects/kola';
import { Datum } from '../../entities/misc/datum';
import { RentService } from '../../shared/rent.service';

@Component({
  selector: 'kalendar',
  templateUrl: './kalendar.component.html'
})
export class KalendarComponent implements OnInit {
  @Input() kola: any;

  datum: Datum;
  static s1: Date;
  static s2: Date;
  dateUnavailable: boolean;
  //zauzetost: any;

  constructor(private servis: RentService) { 
    this.datum = new Datum();
    KalendarComponent.s1 = null;
    KalendarComponent.s2 = null;
  }

  ngOnInit() {
    this.datum = new Datum(this.datum)
    this.dateUnavailable = false;
  }

  IsToday(dan, mesec, godina){
    return this.DateCmp(this.datum.today, new Date(godina, mesec, dan));
  }
  IsAvalable(day, month, year){
    let date = new Date(year, month, day);
    let ret = true;
    this.kola.zauzetost.forEach(element => {
      element.od = new Date(element.od);
      element.do = new Date(element.do);
      if(date >= element.od && date <= element.do){
        ret = false;
      }
    });
    //console.debug(date.getDate() + ' ' + ret);
    return ret;
  }
  IsSelected(dan, mesec, godina){
    let temp = new Date(godina, mesec, dan);
    //console.debug('provera da li je dan ' + dan + ' selektovan...')
    if(KalendarComponent.s1 !== null && KalendarComponent.s2 !== null){
      //console.debug('...u rasponu ' + this.s1.getDate() + '-' + this.s2.getDate())
      if(KalendarComponent.s1 > KalendarComponent.s2){
        //console.debug(this.s1 >= temp && temp >= this.s2)
        return (KalendarComponent.s1 >= temp && temp >= KalendarComponent.s2);
      }
      else{
        //console.debug(this.s2 >= temp && temp >= this.s1)
        return (KalendarComponent.s2 >= temp && temp >= KalendarComponent.s1);
      }
    }
    else if(KalendarComponent.s2 !== null){
      //console.debug('sam dan, s2: ' + this.DateCmp(temp, this.s2))
      return this.DateCmp(temp, KalendarComponent.s2);
    }
    else{
      //console.debug('ispalo iz provere')
      return false;
    }
  }
  IsOverlapping(newSelection: Date) {
    // Ako ni jedan datum jos nije selektovan nema provere preklapanja
    if(KalendarComponent.s2 === null){
      console.debug('nista vec selektovano')
      return false;
    }
    // Jedan je vec selektovan, da li ce selekcija sledeceg dati preklapanje?
    else {
      console.debug('nesto vec selektovano');
      // temp je uvek pocetna vrednost iteracije a tempLimit je granica
      let limit = newSelection;
      if(newSelection < KalendarComponent.s2){
        limit = KalendarComponent.s2;
      }
      else{
        newSelection = KalendarComponent.s2;
      }
      // Da li postoji preklapanje sa zauzetim datumima?
      for(; newSelection < limit; newSelection.setDate(newSelection.getDate() + 1)){
        if(!this.IsAvalable(newSelection.getDate(), newSelection.getMonth(), newSelection.getFullYear())){
          // Postoji, prekini sve sto radis i odjebi
          console.debug(newSelection.getDate(), 'preklapa se');
          return true;
        }
        console.debug(newSelection.getDate(), 'ne preklapa se');
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

  Select(dan, mesec, godina){
    console.debug(dan, 'selektovan')
    let temp = new Date(godina, mesec, dan);
    //console.debug(this.DateCmp(temp, this.s1), this.DateCmp(temp, this.s2))
    // Da li je odabrani datum vec selektovan
    if(!(this.DateCmp(temp, KalendarComponent.s1) || this.DateCmp(temp, KalendarComponent.s2))){
      console.debug('nova selekcija')
       if(this.IsOverlapping(temp)){
         this.dateUnavailable = true;
         console.debug('neuspesna')
       }
       else{
        console.debug('uspesna')
        KalendarComponent.s1 = KalendarComponent.s2;
        KalendarComponent.s2 = temp;
      }
    }
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
  }
}
