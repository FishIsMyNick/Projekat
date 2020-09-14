import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../entities/users/user/user';
import { AppComponent } from '../../../app.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Admin } from 'src/app/entities/users/admin/admin';

@Component({
  selector: 'app-profil-admina',
  templateUrl: './profil-admina.component.html'
})
export class ProfilAdminaComponent implements OnInit {
  podaciForm: FormGroup;
  user: any;
  constructor(private location: Location, private router: Router) { }

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
  onSubmit(){
    console.log(this.podaciForm.value);
    console.log(this.podaciForm);
  }
  onBack()
  {
    this.location.back();
  }
  ChangePassword(){
    this.router.navigate(['promena-lozinke'])
  }
}
