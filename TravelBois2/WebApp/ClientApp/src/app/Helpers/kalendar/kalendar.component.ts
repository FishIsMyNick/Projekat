import { Component, OnInit, Input } from '@angular/core';
import { Kola } from '../../entities/objects/kola';
import { Datum } from '../../entities/misc/datum';

@Component({
  selector: 'kalendar',
  templateUrl: './kalendar.component.html'
})
export class KalendarComponent implements OnInit {
  @Input() kola: Kola;

  datum: Datum;
  s1: Date;
  s2: Date;
  dateUnavailable: boolean;

  constructor() { 
    this.datum = new Datum();
    this.s1 = null;
    this.s2 = null;
  }

  ngOnInit(): void {
    this.datum = new Datum(this.datum)
    this.dateUnavailable = false;
  }

  IsToday(dan, mesec, godina){
    return this.DateCmp(this.datum.today, new Date(godina, mesec, dan));
  }
  IsAvalable(day, month, year){
    let date = new Date(year, month, day);
    let ret = true;
    this.kola.Zauzetost.forEach(element => {
      if(date >= element[0])
        if(date <= element[1])
          ret = false;
    });
    return ret;
  }
  IsSelected(dan, mesec, godina){
    let temp = new Date(godina, mesec, dan);
    //console.debug('provera da li je dan ' + dan + ' selektovan...')
    if(this.s1 !== null && this.s2 !== null){
      //console.debug('...u rasponu ' + this.s1.getDate() + '-' + this.s2.getDate())
      if(this.s1 > this.s2){
        //console.debug(this.s1 >= temp && temp >= this.s2)
        return (this.s1 >= temp && temp >= this.s2);
      }
      else{
        //console.debug(this.s2 >= temp && temp >= this.s1)
        return (this.s2 >= temp && temp >= this.s1);
      }
    }
    else if(this.s2 !== null){
      //console.debug('sam dan, s2: ' + this.DateCmp(temp, this.s2))
      return this.DateCmp(temp, this.s2);
    }
    else{
      console.debug('ispalo iz provere')
      return false;
    }
  }
  IsOverlapping(newSelection: Date) {
    // Ako ni jedan datum jos nije selektovan nema provere preklapanja
    if(this.s2 === null){
      console.debug('nista vec selektovano')
      return false;
    }
    // Jedan je vec selektovan, da li ce selekcija sledeceg dati preklapanje?
    else {
      console.debug('nesto vec selektovano');
      // temp je uvek pocetna vrednost iteracije a tempLimit je granica
      let limit = newSelection;
      if(newSelection < this.s2){
        limit = this.s2;
      }
      else{
        newSelection = this.s2;
      }
      // Da li postoji preklapanje sa zauzetim datumima?
      for(; newSelection < limit; newSelection.setDate(newSelection.getDate() + 1)){
        if(!this.IsAvalable(newSelection.getDate(), newSelection.getMonth(), newSelection.getFullYear())){
          // Postoji, prekini sve sto radis i odjebi
          console.debug(newSelection.getDate(), 'pao');
          return true;
        }
        console.debug(newSelection.getDate(), 'prosao');
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
    if(!(this.DateCmp(temp, this.s1) || this.DateCmp(temp, this.s2))){
      //console.debug('nova selekcija')
      // if(this.IsOverlapping(temp)){
      //   this.dateUnavailable = true;
      //   console.debug('neuspesna')
      // }
      // else{
        //console.debug('uspesna')
        this.s1 = this.s2;
        this.s2 = temp;
      //}
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
    this.s1 = null;
    this.s2 = null;
  }
}
