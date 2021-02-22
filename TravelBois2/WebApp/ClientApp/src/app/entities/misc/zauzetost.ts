import { Meseci } from 'src/app/_enums';
import { OnInit } from '@angular/core';

export class Zauzetost implements OnInit{
    od: Date;
    do: Date;
    kola: string;
    renta: string;
    filijala: number;
    user: string;

    constructor(od: Date, dok: Date, kola: string, renta: string, filijala: number, user: string){
        this.od = od;
        this.do = dok;
        this.kola = kola;
        this.renta = renta;
        this.filijala = filijala;
        this.user = user;
    }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
    
}