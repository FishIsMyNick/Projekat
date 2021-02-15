import { Kola } from './kola'
import { strict } from 'assert';
import { element } from 'protractor';
import { RentACar } from './rent-a-car';

export class Filijala {
    Id: any;
    AdminID: string;
    Adresa: string;
    Grad: string;
    Drzava: string;

    constructor(id, admin: string, adr:string, grad:string, drzava: string){
        this.Id = id;
        this.AdminID = admin;
        this.Adresa = adr;
        this.Grad = grad;
        this.Drzava = drzava;
    }
}