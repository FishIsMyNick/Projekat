import { RegisteredUser } from '../registered-user/registered-user';

export class User {
    brojTelefona: string;
    grad: string;
    name: string;
    lastname: string;
    userName: string;
    password: string;
    tipKorisnika: string;

    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;

    constructor(brTel: string='', grad: string='', ime: string='', 
        prezime: string='', username: string='', password: string=''){
            this.brojTelefona = brTel;
            this.grad = grad;
            this.name = ime;
            this.lastname = prezime;
            this.userName = username;
            this.password = password;
            this.tipKorisnika = 'User';
        }
    
}
