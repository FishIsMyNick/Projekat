import { AvioKompanija } from '../../objects/avio-kompanija';
import { User } from '../user/user';

export class AvioAdmin extends User{
  promenioSifru: boolean;
  avioKompanija: string;

  constructor(brTel: string, grad: string, ime: string, prezime: string, username: string, avioKompanija: string,)
    {
        super(brTel, grad, ime, prezime, username);
        this.tipKorisnika = 'AvioAdmin';
        this.promenioSifru = false;
        this.avioKompanija = avioKompanija;
    }

    //RegistrujAvio(AvioKompanija: AvioKompanija)
    //{
    //    this.avioKompanija = AvioKompanija;
    //}

    PromeniSifru(pass:string){
        this.promenioSifru = true;
        this.password = pass;
    }

}
