import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../entities/users/user/user';
import { AppComponent } from '../../../app.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profil-admina',
  templateUrl: './profil-admina.component.html'
})
export class ProfilAdminaComponent implements OnInit {
  podaciForm: FormGroup;
  currentUser: User;
  constructor(private location: Location) { }

  ngOnInit(): void {
    this.currentUser = AppComponent.currentUser;
    this.initForm(this.currentUser);
  }

  private initForm(currentUser: User){
    this.podaciForm = new FormGroup({
      'username': new FormControl(currentUser.Username, [Validators.required, Validators.maxLength(15), Validators.minLength(3)]),
      'password': new FormControl(currentUser.Password, Validators.required)
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
}
