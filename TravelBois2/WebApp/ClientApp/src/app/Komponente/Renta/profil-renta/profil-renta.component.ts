import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { RentACarAdmin } from 'src/app/entities/users/rent-a-car-admin/rent-a-car-admin';
import { UserService } from 'src/app/shared/user.service';
import { RentAdminPrikaz } from 'src/app/_enums';

@Component({
  selector: 'app-profil-renta',
  templateUrl: './profil-renta.component.html'
})
export class ProfilRentaComponent implements OnInit {
  user: RentACarAdmin;
  prikaz: RentAdminPrikaz;

  constructor(private servis: UserService) { }

  ngOnInit(): void {
    this.prikaz = RentAdminPrikaz.Profil;
    this.user = AppComponent.currentUser as RentACarAdmin;
  }

  SavePassword(){
    
  }

  ChangePassword(){
    this.prikaz = RentAdminPrikaz.Password;
  }
  Profil(){
    this.prikaz = RentAdminPrikaz.Profil;
  }
}
