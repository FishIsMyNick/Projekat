import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from './entities/users/user/user';
import { AvioKompanija } from './entities/objects/avio-kompanija';
import { RentACar } from './entities/objects/rent-a-car';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { UserService } from './shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<app-pocetna-strana [user]="user"></app-pocetna-strana>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //private apiUrl = 'http://localhost:49764/api/applicationuser';
  //private apiUrl = 'localhost:4200';
  data: any = {};

  userDetails;
  static tipKorisnika: string;
  static reset = false;
  static currentUser: User;
  static datum: Date;
  static avioKompanija: AvioKompanija;
  static rente: Array<RentACar>;
  static OceneAviokompanije: Array<{ocena:number, nazivKompanije:string}>;

  title = 'Travel-bois';

  constructor(private http: Http, private service: UserService, private router: Router) {
    console.log('App started');
    this.getContacts();
    //this.getData();
    localStorage.clear();
    //AppComponent.currentUser = new Admin('sysAdmin', 'password');
  }
  getData(){
    //return this.http.get(this.apiUrl).pipe(map((res) => res.json()));
  }
  getContacts(){
    // this.getData().subscribe(data => {
    //   console.log(data);
    //   this.data = data;
    // })
  }

  ngOnInit() {
    AppComponent.currentUser = new User();
    this.service.getUserProfile().subscribe(
      res => {
        console.log(res)
        if (res != null) {
          this.userDetails = res;
        }
        else {
          AppComponent.currentUser = new User();
          //AppComponent.currentUser = new RegisteredUser('tel', 'novi shad', 'pera', 'peric', 'peraCar', 'brpasosa');
          //AppComponent.tipKorisnika = "User";
        }
      },
      err => {
        //console.log(err)
      },
    );
    
    AppComponent.rente = new Array<RentACar>();

  } 
  getType() {
    return AppComponent.currentUser.tipKorisnika;
  }

  onLogOut() {
    localStorage.removeItem('token');
    AppComponent.currentUser = new User();
    this.router.navigate(['/pocetna']);
     // window.location.reload();
  }
}
