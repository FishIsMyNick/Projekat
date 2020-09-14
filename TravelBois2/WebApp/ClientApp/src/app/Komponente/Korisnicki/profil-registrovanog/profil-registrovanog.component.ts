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
  currentUser: RegisteredUser;
  brojP: string;
  constructor(private router: Router, private toastr: ToastrService, private service: UserService) { }

  ngOnInit(): void {
    this.service.getUserProfileByName(AppComponent.currentUser.userName).subscribe(
      (res: any) => {
        this.currentUser = res as RegisteredUser;
        this.initForm();
      },
      (err) => {
        console.log(err);
      });
    this.initForm();
  }

  private initForm()
  {
    var ime = this.currentUser.name;
    var prezime = this.currentUser.lastname;
    var grad = this.currentUser.grad;
    var brTel = this.currentUser.brojTelefona;
    var brPas = this.currentUser.brojPasosa;
    var username = this.currentUser.userName;
    this.podaciForm = new FormGroup({
      'ime': new FormControl(ime, [Validators.required, Validators.maxLength(15), Validators.minLength(3)]),
      'prezime': new FormControl(prezime, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      'grad': new FormControl(grad, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      'brojTelefona': new FormControl(brTel, Validators.required),
      'brojPasosa': new FormControl(brPas, Validators.required),
      'username': new FormControl(username, Validators.required),
    });
  }

  onSubmit() {
    if ((this.podaciForm.get('brojTelefona').value != this.currentUser.brojTelefona) || (this.podaciForm.get('grad').value != this.currentUser.grad) ||
      (this.podaciForm.get('ime').value != this.currentUser.name) || (this.podaciForm.get('prezime').value != this.currentUser.lastname) || (this.podaciForm.get('brojPasosa').value != this.currentUser.brojPasosa))
    {
      this.brojP = this.podaciForm.get('brojPasosa').value;

      var body = {
        UserName: this.currentUser.userName,
        Name: this.podaciForm.get('ime').value,
        Lastname: this.podaciForm.get('prezime').value,
        Grad: this.podaciForm.get('grad').value,
        BrojTelefona: this.podaciForm.get('brojTelefona').value,
        BrojPasosa: this.brojP.toString(),
      }
      this.service.updateUser(body).subscribe();

      this.toastr.success('Uspesno ste izmenili podatke!');
      //this.router.navigate(['/pocetna'])
    }
    else {
      this.toastr.error('Morate izmeniti vrednosti polja!');
    }
  }

  onBack()
  {
    this.router.navigateByUrl('/pocetna');
  }

  

}
