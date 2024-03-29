import { NgIf } from '@angular/common';
import { Ocena } from 'src/app/entities/misc/ocena'
import { TipVozila } from 'src/app/_enums'
import { RentACar } from './rent-a-car';

export class Kola {
    NazivRente: string;
    BrojMesta: number;
    filijala: number;
    Cena: number;
    CenaBrzeRezervacije: number;
    Godiste: number;
    ID: number;
    Naziv: string;
    TipVozila: string;
    //za prenos podataka
    zauzetost: Array<[Date, Date]>

    constructor(brMesta:number, godiste:number, marka:string, model:string, tip: string, renta: string = null, cena: number = 0, filijala: number, cenaBR: number = 0){
        this.BrojMesta = brMesta;
        this.Godiste = godiste;
        this.Naziv = marka + '-' + model;
        this.TipVozila = tip;
        this.filijala = filijala;
        this.Cena = cena;
        this.NazivRente = renta;
        this.CenaBrzeRezervacije = cenaBR;
        
        this.zauzetost = new Array<[Date, Date]>();
    }

    private NazivParser(){
        return this.Naziv.split('-');
    }
    GetMarka(){
        return this.NazivParser()[0];
    }
    GetModel(){
        return this.NazivParser()[1];
    }
    SetMarka(marka:string){
        this.Naziv = marka + '-' + this.GetModel();
    }
    SetModel(model:string){
        this.Naziv = this.GetMarka() + '-' + model;
    }
    GetTip(){
        return TipVozila[this.TipVozila];
    }
    //ProsecnaOcena(){
    //    let sum = 0;
    //    this.Ocene.forEach(element => {
    //        sum += element.O;
    //    });
    //    return Math.round(sum / this.Ocene.length)
    //}
}
