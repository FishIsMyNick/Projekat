import { NgIf } from '@angular/common';
import { Ocena } from 'src/app/entities/misc/ocena'
import { TipVozila } from 'src/app/_enums'
import { RentACar } from './rent-a-car';

export class Kola {
    NazivRente: string;
    BrojMesta: number;
    BrzaRezervacija: boolean;
    Cena: number;
    Godiste: number;
    ID: number;
    Naziv: string;
    Ocene: Array<Ocena>;
    Tip: TipVozila;
    //Zauzet: boolean;
    Zauzetost: Array<[Date, Date]>

    constructor(brMesta:number, godiste:number, marka:string, model:string, tip:TipVozila, renta: string = null, cena: number = 0, brzaRezervacija:boolean = false){
        this.BrojMesta = brMesta;
        this.Godiste = godiste;
        this.Naziv = marka + '-' + model;
        this.Tip = tip;
        this.BrzaRezervacija = brzaRezervacija;
        this.Cena = cena;
        this.NazivRente = renta;
        
        //Ne radi kako treba
        //this.ID = IdHandler.GenerateKolaID();
        this.Ocene = new Array<Ocena>();
        //this.Zauzet = false;
        this.Zauzetost = new Array<[Date, Date]>();
        this.Zauzetost.push([new Date(2020, 3, 3), new Date(2020, 3, 9)]);
        this.Zauzetost.push([new Date(2020, 3, 28), new Date(2020, 4, 5)]);
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
        return TipVozila[this.Tip];
    }
    //ProsecnaOcena(){
    //    let sum = 0;
    //    this.Ocene.forEach(element => {
    //        sum += element.O;
    //    });
    //    return Math.round(sum / this.Ocene.length)
    //}
}
