import { Component, OnInit } from '@angular/core';
import { RentACar } from '../../../entities/objects/rent-a-car';
import { User } from '../../../entities/users/user/user';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-rent-a-car',
  template: '<p>test</p>',
  templateUrl: './rent-a-car.component.html'
})
export class RentACarComponent implements OnInit {
  rente: Array<RentACar>;
  currentUser: User;
  constructor() { 
    this.rente = new Array<RentACar>();
    this.currentUser = AppComponent.currentUser;
  }

  ngOnInit(): void {
    //this.rente.push(new RentACar('Car2Go'));
  }

}
