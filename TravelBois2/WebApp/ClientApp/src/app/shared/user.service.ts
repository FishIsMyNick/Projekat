import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RegisteredUser } from '../entities/users/registered-user/registered-user';
import { Observable } from 'rxjs';
import { User } from '../entities/users/user/user';
import { Prijatelj } from '../entities/objects/prijatelj';
import { PrihvacenPrijatelj } from '../entities/objects/prihvacen-prijatelj';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BaseURI = 'https://localhost:44343/api';
  constructor(private fb:FormBuilder, private http: HttpClient) { }

  userFormModel = this.fb.group({
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
  rentAdminFormModel = this.fb.group({
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
  avioAdminFormModel = this.fb.group({
    Email :['', [Validators.required, Validators.email]],
    UserName :['', [Validators.required]],
    Name: ['', [Validators.required]],
    Lastname: ['', [Validators.required]],
    Grad: ['', [Validators.required]],
    NazivAviokompanije: ['', [Validators.required]],
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

//#region  Registracija
  registerUser() {
    console.debug('callback register rent admin')
    var body = {
      Email: this.userFormModel.value.Email,
      UserName: this.userFormModel.value.UserName,
      Name: this.userFormModel.value.Name,
      Lastname: this.userFormModel.value.Lastname,
      Grad: this.userFormModel.value.Grad,
      BrojTelefona: this.userFormModel.value.BrojTelefona,
      BrojPasosa: this.userFormModel.value.BrojPasosa,
      Password: this.userFormModel.value.Passwords.Password,
      TipKorisnika: 'RegularUser'
    }
    return this.http.post(this.BaseURI + '/ApplicationUser/RegisterUser', body);
  }
  registerRentAdmin() {
    console.debug('callback register')
    var body = {
      Email: this.rentAdminFormModel.value.Email,
      UserName: this.rentAdminFormModel.value.UserName,
      Name: this.rentAdminFormModel.value.Name,
      Lastname: this.rentAdminFormModel.value.Lastname,
      Grad: this.rentAdminFormModel.value.Grad,
      NazivKompanije: this.rentAdminFormModel.value.NazivKompanije,
      BrojTelefona: this.rentAdminFormModel.value.BrojTelefona,
      BrojPasosa: this.rentAdminFormModel.value.BrojPasosa,
      Password: this.rentAdminFormModel.value.Passwords.Password,
      TipKorisnika: 'RentAdmin'
    }
    return this.http.post(this.BaseURI + '/ApplicationUser/RegisterRentAdmin', body);
  }

  registerAvioAdmin() {
    console.debug('callback register')
    var body = {
      Email: this.avioAdminFormModel.value.Email,
      UserName: this.avioAdminFormModel.value.UserName,
      Name: this.avioAdminFormModel.value.Name,
      Lastname: this.avioAdminFormModel.value.Lastname,
      Grad: this.avioAdminFormModel.value.Grad,
      NazivAviokompanije: this.avioAdminFormModel.value.NazivAviokompanije,
      BrojTelefona: this.avioAdminFormModel.value.BrojTelefona,
      BrojPasosa: this.avioAdminFormModel.value.BrojPasosa,
      Password: this.avioAdminFormModel.value.Passwords.Password,
      TipKorisnika: 'AvioAdmin'
    }
    return this.http.post(this.BaseURI + '/ApplicationUser/RegisterAvioAdmin', body);
  }
  //#endregion
  externalLogin(formData){
    return this.http.post(this.BaseURI + '/ApplicationUser/SocialLogin',formData);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile/GetUserProfile');
  }
  getUserProfileByName(username: string): Observable<string>{
    const formData = new FormData();
    formData.append(username, 'username');

    return this.http.post<any>(this.BaseURI + '/UserProfile/GetUserProfileByName', formData);
  }
  getAdminProfile() {
    return this.http.get(this.BaseURI + '/AvioAdmin/GetAvioAdminProfile');
  }

  updateRegisteredUser(body) {
    return this.http.post(this.BaseURI + '/ApplicationUser/UpdateRegisteredUser', body);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.BaseURI + '/ApplicationUser/GetUsers');
  }

  sendZahtev(prijatelj: Prijatelj): Observable<Prijatelj> {
    return this.http.post<Prijatelj>(this.BaseURI + '/ApplicationUser/AddZahtev', prijatelj);
  }

  getZahtevi(): Observable<Prijatelj[]> {
    return this.http.get<Prijatelj[]>(this.BaseURI + '/ApplicationUser/GetZahtevi');
  }

  deleteZahtev(id: number): Observable<any> {
    return this.http.delete(this.BaseURI + '/ApplicationUser/DeleteZahtev/' + id);
  }

  addPrijatelj(prijatelj: PrihvacenPrijatelj): Observable<PrihvacenPrijatelj> {
    return this.http.post<PrihvacenPrijatelj>(this.BaseURI + '/ApplicationUser/AddPrijatelj', prijatelj);
  }

  getPrijatelji(): Observable<PrihvacenPrijatelj[]> {
    return this.http.get<PrihvacenPrijatelj[]>(this.BaseURI + '/ApplicationUser/GetPrijatelji');
  }

  deletePrijatelj(id: number): Observable<any> {
    return this.http.delete(this.BaseURI + '/ApplicationUser/DeletePrijatelj/' + id);
  }
  

}
