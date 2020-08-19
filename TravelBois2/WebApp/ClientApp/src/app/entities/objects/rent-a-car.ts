import { Filijala } from './filijala'
import { Ocena } from '../misc/ocena'
import { Kola } from './kola';
import { AppComponent } from '../../app.component';

export class RentACar {
    Naziv: string;
    Adresa: string;
  Opis: string;
  AdminID: string;
    Filijale: Array<Filijala>;
    Ocene: Array<Ocena>;
    filtriranaKola: Array<Kola>;

    //Za CSS
    tip: string = 'RentACar';
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
//  Cisto da prikaze nesto
        this.Filijale.push(new Filijala('Bogdana Garabantina 3', 'Car2Go-Liman', 'Novi Sad', this.Naziv));
        this.Filijale.forEach(element => {
            element.ListaKola.forEach(k => {
                //console.debug(k.Naziv);
                this.filtriranaKola.push(k);
            });
        });
    }
    getType(){
        return RentACar.name;
    }

    //ProsecnaOcena(){
    //    let count = 0;
    //    let sum = 0;
    //    this.Ocene.forEach(element => {
    //        sum += element.O;
    //        count += 1;
    //    });
    //    return sum / count;
    //}

    OceniKompaniju(ocena: Ocena) {
        this.Ocene.push(ocena);
    }
    DodajFilijalu(f:Filijala){
        this.Filijale.push(f);
    }
    DodajKola(k:Kola, filijala:string){
        
    }
    PrikaziFilijale(){}
    GetAllCars(){
        let kola = new Array<Kola>();
        this.Filijale.forEach(element => {
            element.ListaKola.forEach(element => {
                kola.push(element);
            });
        });
        return kola;
    }
    PrikaziKola(){}
    RezervisiKola(ID:number, username:string, odKad:Date, doKad:Date){}
}
