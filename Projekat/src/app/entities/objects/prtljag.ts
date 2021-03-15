import { TipPrtljaga } from 'src/app/_enums';

export class Prtljag {
    cena: number;
    tip: TipPrtljaga;

    constructor(cena:number, tip: TipPrtljaga){
        this.cena = cena;
        this.tip = tip;
    }
}