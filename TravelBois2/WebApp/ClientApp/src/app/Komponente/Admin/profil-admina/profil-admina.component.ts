import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../entities/users/user/user';
import { AppComponent } from '../../../app.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Admin } from 'src/app/entities/users/admin/admin';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profil-admina',
  templateUrl: './profil-admina.component.html'
})
export class ProfilAdminaComponent implements OnInit {
  podaciForm: FormGroup;
  user: any;
  constructor(private location: Location, private router: Router, private servis: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.user = AppComponent.currentUser as Admin;
    this.initForm(this.user);
  }

  private initForm(currentUser: User){
    this.podaciForm = new FormGroup({
      'username': new FormControl(currentUser.userName, [Validators.required, Validators.maxLength(15), Validators.minLength(3)]),
      'password': new FormControl(currentUser.userName, Validators.required)
    });
  }
  Save(){
    let username = (<HTMLInputElement>document.getElementById('username')).value;
    let email = (<HTMLInputElement>document.getElementById('email')).value;
    let ime = (<HTMLInputElement>document.getElementById('ime')).value;
    let prezime = (<HTMLInputElement>document.getElementById('prezime')).value;
    let brTel = (<HTMLInputElement>document.getElementById('brTel')).value;
    let brPas = (<HTMLInputElement>document.getElementById('brPas')).value;

    var body = {
      UserName: username, 
      Name: ime,
      Lastname: prezime,
      Grad: this.user.grad,
      BrojTelefona: brTel,
      BrojPasosa: brPas
    }

    this.servis.updateUser(body).subscribe();
    this.toastr.success('Uspesno ste izmenili podatke!');
  }
  ChangePassword(){
    this.router.navigate(['promena-lozinke'])
  }
}
