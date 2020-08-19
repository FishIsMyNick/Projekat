import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/users/user/user';
import { AppComponent } from 'src/app/app.component';
import { RentACarAdmin } from 'src/app/entities/users/rent-a-car-admin/rent-a-car-admin';

@Component({
  selector: 'app-vozila',
  templateUrl: './vozila.component.html'
})
export class VozilaComponent implements OnInit {
  currentUser: RentACarAdmin;
  constructor() { 
    this.currentUser = AppComponent.currentUser as RentACarAdmin;
  }

  ngOnInit(): void {
  }

  AddCar(){}
  EditCar(){}
}
