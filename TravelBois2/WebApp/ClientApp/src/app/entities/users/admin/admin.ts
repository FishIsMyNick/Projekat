import { User } from '../user/user'

export class Admin extends User {
    constructor(username, password){
        super();
        this.userName = username;
        this.password = password;
        this.tipKorisnika = 'Admin';
    }
}
