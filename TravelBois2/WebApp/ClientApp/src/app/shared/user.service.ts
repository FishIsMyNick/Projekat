import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BaseURI = 'https://localhost:44343/api';
  constructor(private fb:FormBuilder, private http: HttpClient) { }

  formModel = this.fb.group({
    Email :['', [Validators.required, Validators.email]],
    UserName :['', [Validators.required]],
    Name: ['', [Validators.required]],
    Lastname: ['', [Validators.required]],
    Grad: ['', [Validators.required]],
    BrojTelefona: ['', [Validators.required]],
    BrojPasosa: ['', [Validators.required]],
    Passwords: this.fb.group({
      Password :['', [Validators.required]],
      ConfirmPassword :['', [Validators.required]]
    }, {validator: this.comparePasswords})
  });

  comparePasswords(fb: FormGroup){
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if(confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors){
      if(fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({passwordMismatch: true});
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    console.debug('callback register')
    var body = {
      Email: this.formModel.value.Email,
      UserName: this.formModel.value.UserName,
      Name: this.formModel.value.Name,
      Lastname: this.formModel.value.Lastname,
      Grad: this.formModel.value.Grad,
      BrojTelefona: this.formModel.value.BrojTelefona,
      BrojPasosa: this.formModel.value.BrojPasosa,
      Password: this.formModel.value.Passwords.Password
    }
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }
  login(formData){
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }
}
