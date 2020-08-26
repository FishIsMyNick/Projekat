import { RegisteredUser } from '../registered-user/registered-user';

export class User {
    registered: boolean = false;
    loggedIn: boolean;
    brojTelefona: string;
    grad: string;
    name: string;
    lastname: string;
    userName: string;
    password: string;
    tipKorisnika: string;

    constructor(brTel: string='', grad: string='', ime: string='', 
        prezime: string='', username: string='', password: string=''){
            this.loggedIn = false;
            this.brojTelefona = brTel;
            this.grad = grad;
            this.name = ime;
            this.lastname = prezime;
            this.userName = username;
            this.password = password;
            this.tipKorisnika = 'User';
        }
    
    register(){
        this.registered = true;
    }
}
