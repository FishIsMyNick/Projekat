import { User } from "../user/user"
import { RentACar } from 'src/app/entities/objects/rent-a-car'
import { Filijala } from '../../objects/filijala';

export class RentACarAdmin extends User {
    PromenioSifru:boolean;
    Renta: RentACar;

    constructor(brTel: string, grad: string, ime: string, 
        prezime: string, username: string, password: string){
            super(brTel, grad, ime, prezime, username, password);
            super.register();
            this.tipKorisnika = 'RentAdmin'
            this.PromenioSifru = false;
            this.Renta = new RentACar("SuperRenta", "Bozidara Djelica 4");
        }
    
    RegistrujRentu(renta: RentACar){
        this.Renta = renta;
    }
    PromeniSifru(pass:string){
        this.PromenioSifru = true;
        this.password = pass;
    }
    DodajFilijalu(f:Filijala){
        this.Renta.DodajFilijalu(f);
    }
}