import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../shared/user.service';
import { AppComponent } from '../../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html'
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private toastr: ToastrService, private servis: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  async Save() {
    let oldPass = (<HTMLInputElement>document.getElementById('currPass')).value;
    let newPass = (<HTMLInputElement>document.getElementById('newPass')).value;
    let confirm = (<HTMLInputElement>document.getElementById('confirm')).value;
    if (newPass != confirm) {
      this.toastr.error('Nova sifra i potvrda moraju da se poklapaju');
    }
    else {
      if (await this.servis.ChangePassword(AppComponent.currentUser.userName, oldPass, newPass)) {
        this.toastr.success('Uspesno ste promenili sifru!');
        AppComponent.currentUser.promenioPassword = true;
        this.router.navigate(['pocetna']);
      }
      else{
        this.toastr.error('Uneli ste pogresnu sifru!')
      }
    }
  }
}
