import { AvioKompanija } from '../../objects/avio-kompanija';
import { User } from '../user/user';

export class AvioAdmin extends User{  
  avioKompanija: string;

  constructor(brTel: string, grad: string, ime: string, prezime: string, username: string, avioKompanija: string,)
    {
        super(brTel, grad, ime, prezime, username);
        this.tipKorisnika = 'AvioAdmin';
        this.promenioPassword = false;
        this.avioKompanija = avioKompanija;
    }
}
