import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from './entities/users/user/user';
import { RegisteredUser } from './entities/users/registered-user/registered-user';
import { RentACarAdmin } from './entities/users/rent-a-car-admin/rent-a-car-admin';
import { AvioKompanijeComponent } from './Komponente/Avio/avio-kompanije/avio-kompanije.component';
import { AvioKompanija } from './entities/objects/avio-kompanija';
import { RentACar } from './entities/objects/rent-a-car';
import { Admin } from './entities/users/admin/admin';
import { AvioAdmin } from './entities/users/avio-admin/avio-admin';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {OperatorFunction} from 'rxjs/internal/types';
import { UserService } from './shared/user.service';
import { Local } from 'protractor/built/driverProviders';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Ocena } from './entities/misc/ocena';

@Component({
  selector: 'app-root',
  template: '<app-pocetna-strana [user]="user"></app-pocetna-strana>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private apiUrl = 'localhost:50356/applicationuser';
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
    this.getData();
    localStorage.clear();
    //AppComponent.currentUser = new Admin('sysAdmin', 'password');
  }
  getData(){
    return this.http.get(this.apiUrl).pipe(map((res) => res.json()));
  }
  getContacts(){
    this.getData().subscribe(data => {
      console.log(data);
      this.data = data;
    })
  }

  ngOnInit() {
    if(true){
    this.service.getUserProfile().subscribe(
      res => {
        if (res != null) {
          this.userDetails = res;
        }
        else {
          //AppComponent.currentUser = new User();
          AppComponent.currentUser = new RegisteredUser('tel', 'novi shad', 'pera', 'peric', 'peraCar', 'brpasosa');
          AppComponent.tipKorisnika = "User";
        }
      },
      err => {

        console.log(err);
      },
    );
    }
    
    AppComponent.rente = new Array<RentACar>();

    AppComponent.rente.push(new RentACar('Car2Go', 'adresa 3'))
    
  } 
  getType() {
    return AppComponent.tipKorisnika;
  }

  onLogOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/pocetna']);
    if (this.router.url == '/pocetna') {
      window.location.reload();
    }
  }
}
