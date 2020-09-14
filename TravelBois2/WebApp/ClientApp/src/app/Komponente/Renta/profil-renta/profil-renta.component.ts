import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private servis: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = AppComponent.currentUser as RentACarAdmin;
  }

  SavePassword(){
    
  }

  ChangePassword(){
    this.router.navigate(['promena-lozinke'])
  }
}
