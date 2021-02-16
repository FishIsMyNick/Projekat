import { Kola } from './kola'
import { strict } from 'assert';
import { element } from 'protractor';
import { RentACar } from './rent-a-car';

export class Filijala {
    id: any;
    adminID: string;
    adresa: string;
    grad: string;
    drzava: string;

    constructor(id, admin: string, adr:string, grad:string, drzava: string){
        this.id = id;
        this.adminID = admin;
        this.adresa = adr;
        this.grad = grad;
        this.drzava = drzava;
    }
}