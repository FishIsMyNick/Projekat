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
    this.currentUser = AppComponent.currentUser as RegisteredUser ;
    this.initForm(this.currentUser);
  }

  private initForm(currentUser: User)
  {
    this.podaciForm = new FormGroup({
      'ime': new FormControl(this.currentUser.Ime, [Validators.required, Validators.maxLength(15), Validators.minLength(3)]),
      'prezime': new FormControl(this.currentUser.Prezime, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      'grad': new FormControl(this.currentUser.Grad, [Validators.required, Validators.maxLength(10), Validators.minLength(3)]),
      'brojTelefona': new FormControl(currentUser.BrojTelefona, Validators.required),
      'brojPasosa': new FormControl(this.currentUser.BrojPasosa, Validators.required),
      'username': new FormControl(this.currentUser.Username, Validators.required),
    });
  }

  onSubmit() {
    if ((this.podaciForm.get('brojTelefona').value != this.currentUser.BrojTelefona) || (this.podaciForm.get('grad').value != this.currentUser.Grad) ||
      (this.podaciForm.get('ime').value != this.currentUser.Ime) || (this.podaciForm.get('prezime').value != this.currentUser.Prezime) || (this.podaciForm.get('brojPasosa').value != this.currentUser.BrojPasosa))
    {
      this.brojP = this.podaciForm.get('brojPasosa').value;

      var body = {
        UserName: this.currentUser.Username,
        Name: this.podaciForm.get('ime').value,
        Lastname: this.podaciForm.get('prezime').value,
        Grad: this.podaciForm.get('grad').value,
        BrojTelefona: this.podaciForm.get('brojTelefona').value,
        BrojPasosa: this.brojP.toString(),
      }
      this.service.updateRegisteredUser(body).subscribe();

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
