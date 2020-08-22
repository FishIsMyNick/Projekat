import { User } from '../user/user'

export class Admin extends User {
    constructor(username, password){
        super();
        this.Username = username;
        this.Password = password;
        this.tipKorisnika = 'Admin';
    }
}
