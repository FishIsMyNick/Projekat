import { User } from "../user/user"
import { RentACar } from 'src/app/entities/objects/rent-a-car'
import { Filijala } from '../../objects/filijala';

export class RentACarAdmin extends User {

    Renta: RentACar;

    constructor(brTel: string, grad: string, ime: string, 
        prezime: string, username: string, password: string){
            super(brTel, grad, ime, prezime, username, password);
            this.tipKorisnika = 'RentAdmin'
            this.promenioPassword = false;
            this.Renta = new RentACar("SuperRenta", "Bozidara Djelica 4");
        }
}