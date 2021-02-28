import { Meseci } from 'src/app/_enums';
import { OnInit } from '@angular/core';

export class Datum implements OnInit{
    datum: Date;
    today: Date;
    dan: number;
    mesec: number;
    godina: number;
    danaUMesecu: number;
    danUNedelji: number;

    constructor(datum: Datum = null){
        this.today = new Date();
        if(datum == null)
            this.datum = new Date()
        else
            this.datum = new Date(datum.datum);
        this.dan = this.datum.getDate();
        this.mesec = this.datum.getMonth();
        this.godina = this.datum.getFullYear();
        this.danUNedelji = this.datum.getDay();
        this.ngOnInit();
    }
    ngOnInit(){
        this.Update();
    }
    //Getters
    GetWeekday(){
        return this.datum.getDay();
    }
    GetDay(){
        return this.datum.getDate();
    }
    GetMonth(){
        return Meseci[this.datum.getMonth()];
    }
    GetYear(){
        return this.datum.getFullYear();
    }
    //Setters
    SetDay(dan: number){
      this.datum.setDate(dan);
      this.dan = dan;
      this.danUNedelji = this.datum.getDay();
    }
    SetMonth(mon: number){
      this.datum.setMonth(mon);
      this.mesec = mon;
      this.danUNedelji = this.datum.getDay();
    }
    SetYear(god: number){
      this.datum.setFullYear(god);
      this.godina = god;
      this.danUNedelji = this.datum.getDay();
    }
    //Ostalo
    UvecajMesec(){
        let novMesec = this.datum.getMonth();
        novMesec += 1;
        if(novMesec === 12){
            novMesec = 0;
            this.SetYear(this.datum.getFullYear() + 1)
        }
        this.SetMonth(novMesec)
        this.ngOnInit();
    }
    UmanjiMesec(){
        let novMesec = this.datum.getMonth();
        novMesec -= 1;
        if(novMesec === -1){
            novMesec = 11;
            this.SetYear(this.datum.getFullYear() - 1)
        }
        this.SetMonth(novMesec)
        this.ngOnInit();
    }
    Update(){
        this.today = new Date();
        if(this.mesec === 1){
          if(this.datum.getFullYear() % 4 === 0){
            this.danaUMesecu = 29;
          }
          else{
            this.danaUMesecu = 28;
          }
        }
        else if(this.mesec <= 6){
          if(this.mesec % 2 !== 0){
            this.danaUMesecu = 30;
          }
          else{
            this.danaUMesecu = 31;
          }
        }
        else{
          if(this.mesec % 2 !== 0){
            this.danaUMesecu = 31;
          }
          else{
            this.danaUMesecu = 30;
          }
        }
    }
}
