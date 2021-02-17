import { Filijala } from './filijala'
import { Ocena } from '../misc/ocena'
import { Kola } from './kola';
import { AppComponent } from '../../app.component';

export class RentACar {
    naziv: string;
    adresa: string;
    grad: string;
    drzava: string;
    opis: string;
    adminID: string;
    filijale: Array<Filijala>;
    ocene: Array<Ocena>;
    filtriranaKola: Array<Kola>;

    //Za CSS
    tip: string = 'RentACar/Kompanije';
    klasa: string = 'kompanija-slika'

    constructor(naz:string, adr: string) {
        //console.debug('konstruktor rente')
        //console.trace();
        this.naziv = naz;
        this.adresa = adr;
        this.opis = 'Opis rente';
        this.filijale = new Array<Filijala>();
        this.ocene = new Array<Ocena>();
        this.filtriranaKola = new Array<Kola>();
    }
    getType(){
        return RentACar.name;
    }

    OceniKompaniju(ocena: Ocena) {
        this.ocene.push(ocena);
    }
    DodajFilijalu(f:Filijala){
        this.filijale.push(f);
    }
    DodajKola(k:Kola, filijala:string){
        
    }
    PrikaziFilijale(){}
    PrikaziKola(){}
    RezervisiKola(ID:number, username:string, odKad:Date, doKad:Date){}
}
