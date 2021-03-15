import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private servis: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.user = AppComponent.currentUser as RentACarAdmin;
  }

  async Save(){
    let username = (<HTMLInputElement>document.getElementById('username')).value;
    let email = (<HTMLInputElement>document.getElementById('email')).value;
    let ime = (<HTMLInputElement>document.getElementById('ime')).value;
    let prezime = (<HTMLInputElement>document.getElementById('prezime')).value;
    let grad = (<HTMLInputElement>document.getElementById('grad')).value;
    let drzava = (<HTMLInputElement>document.getElementById('drzava')).value;
    let brTel = (<HTMLInputElement>document.getElementById('brTel')).value;
    let brPas = (<HTMLInputElement>document.getElementById('brPas')).value;

    var body = {
      UserName: username, 
      Name: ime,
      Lastname: prezime,
      Grad: grad,
      Drzava: drzava,
      BrojTelefona: brTel,
      BrojPasosa: brPas
    }

    AppComponent.currentUser = await this.servis.UpdateUser(body);
    this.toastr.success('Uspesno ste izmenili podatke!');
  }

  ChangePassword(){
    this.router.navigate(['promena-lozinke'])
  }
}
