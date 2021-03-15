import { RegisteredUser } from '../registered-user/registered-user';

export class User {
    brojTelefona: string;
    brojPasosa: string;
    grad: string;
    drzava: string;
    name: string;
    lastname: string;
    userName: string;
    password: string;
    tipKorisnika: string;
    promenioPassword: boolean;

    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;

    constructor(brTel: string='', brPasos: string = '', grad: string='',
         ime: string='', drzava: string = '', prezime: string='', 
         username: string='', password: string=''){
            this.brojTelefona = brTel;
            this.brojPasosa = brPasos;
            this.grad = grad;
            drzava = drzava;
            this.name = ime;
            this.lastname = prezime;
            this.userName = username;
            this.password = password;
            this.tipKorisnika = 'User';
        }
    
}
