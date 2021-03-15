import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AvioKompanija } from '../entities/objects/avio-kompanija';
import { Observable } from 'rxjs';
import { AvioAdmin } from '../entities/users/avio-admin/avio-admin';

@Injectable({
  providedIn: 'root'
})
export class AvioAdminService {
  readonly BaseURI = 'http://localhost:49764/api';
  constructor(private fb:FormBuilder, private http: HttpClient) { }

  formModel = this.fb.group({
    Email :['', [Validators.required, Validators.email]],
    UserName :['', [Validators.required]],
    Name: ['', [Validators.required]],
    Lastname: ['', [Validators.required]],
    AvioKompanijaID: ['', [Validators.required]],
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
    console.debug('avio-admin service: callback register')
    var body = {
      Email: this.formModel.value.Email,
      UserName: this.formModel.value.UserName,
      Name: this.formModel.value.Name,
      Lastname: this.formModel.value.Lastname,
      AvioKompanijaID: this.formModel.value.AvioKompanijaID,
      Grad: this.formModel.value.Grad,
      BrojTelefona: this.formModel.value.BrojTelefona,
      BrojPasosa: this.formModel.value.BrojPasosa,
      Password: this.formModel.value.Passwords.Password
    }
    console.debug('body popunjen')
    return this.http.post(this.BaseURI + '/AvioAdmin/Register', body);
  }

  addAvioKompanija(aviokompanija: AvioKompanija): Observable<AvioKompanija> {
    return this.http.post<AvioKompanija>(this.BaseURI + '/Aviokompanija/AddAvioKompanija', aviokompanija);
  }

  getAviokompanije(): Observable<AvioKompanija[]> {
    return this.http.get<AvioKompanija[]>(this.BaseURI + '/Aviokompanija/GetAvioKompanije');
  }

  updateAviokompanija(aviokompanija: AvioKompanija, naziv) {
    return this.http.put(this.BaseURI + '/Aviokompanija/UpdateAviokompanijaProfil/' + naziv, aviokompanija);
  }
}
