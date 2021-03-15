import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AppComponent } from '../../../app.component';
import { User } from '../../../entities/users/user/user';
import { RegisteredUser } from '../../../entities/users/registered-user/registered-user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'app-profil-registrovanog',
  templateUrl: './profil-registrovanog.component.html'
})
export class ProfilRegistrovanogComponent implements OnInit {
  podaciForm: FormGroup;
  user: RegisteredUser;
  brojP: string;
  constructor(private router: Router, private toastr: ToastrService, private service: UserService) { }

  ngOnInit(): void {
    this.service.getUserProfileByName(AppComponent.currentUser.userName).subscribe(
      (res: any) => {
        this.user = res as RegisteredUser;
      },
      (err) => {
        console.log(err);
      });
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

    AppComponent.currentUser = await this.service.UpdateUser(body);
    this.toastr.success('Uspesno ste izmenili podatke!');
  }
  ChangePassword(){
    this.router.navigate(['promena-lozinke'])
  }
}
