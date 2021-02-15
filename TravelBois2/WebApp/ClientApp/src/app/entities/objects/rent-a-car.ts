import { Filijala } from './filijala'
import { Ocena } from '../misc/ocena'
import { Kola } from './kola';
import { AppComponent } from '../../app.component';

export class RentACar {
    Naziv: string;
    Adresa: string;
    Grad: string;
    Drzava: string;
    Opis: string;
    AdminID: string;
    Filijale: Array<Filijala>;
    Ocene: Array<Ocena>;
    filtriranaKola: Array<Kola>;

    //Za CSS
    tip: string = 'RentACar/Kompanije';
    klasa: string = 'kompanija-slika'

    constructor(naz:string, adr: string) {
        //console.debug('konstruktor rente')
        //console.trace();
        this.Naziv = naz;
        this.Adresa = adr;
      this.Opis = 'Opis rente';
        this.Filijale = new Array<Filijala>();
        this.Ocene = new Array<Ocena>();
        this.filtriranaKola = new Array<Kola>();
    }
    getType(){
        return RentACar.name;
    }

    OceniKompaniju(ocena: Ocena) {
        this.Ocene.push(ocena);
    }
    DodajFilijalu(f:Filijala){
        this.Filijale.push(f);
    }
    DodajKola(k:Kola, filijala:string){
        
    }
    PrikaziFilijale(){}
    PrikaziKola(){}
    RezervisiKola(ID:number, username:string, odKad:Date, doKad:Date){}
}
