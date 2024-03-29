import { Injectable, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RegisteredUser } from '../entities/users/registered-user/registered-user';
import { Observable } from 'rxjs';
import { User } from '../entities/users/user/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Prijatelj } from '../entities/objects/prijatelj';
import { PrihvacenPrijatelj } from '../entities/objects/prihvacen-prijatelj';
import { auth } from 'firebase';
import { basename } from 'node:path';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  readonly BaseURI = 'http://localhost:49764/api';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private angularFireAuth: AngularFireAuth,
    public afAuth: AngularFireAuth,
    public ngZone: NgZone,
    private router: Router) { }

  userFormModel = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],
    UserName: ['', [Validators.required]],
    Name: ['', [Validators.required]],
    Lastname: ['', [Validators.required]],
    Grad: ['', [Validators.required]],
    Drzava: ['', Validators.required],
    BrojTelefona: ['', [Validators.required]],
    BrojPasosa: ['', [Validators.required]],
    Passwords: this.fb.group({
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]]
    }, { validator: this.comparePasswords })
  });
  rentAdminFormModel = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],
    UserName: ['', [Validators.required]],
    Name: ['', [Validators.required]],
    Lastname: ['', [Validators.required]],
    Grad: ['', [Validators.required]],
    Drzava: ['', [Validators.required]],
    BrojTelefona: ['', [Validators.required]],
    BrojPasosa: ['', [Validators.required]],
    Passwords: this.fb.group({
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]]
    }, { validator: this.comparePasswords })
  });
  avioAdminFormModel = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],
    UserName: ['', [Validators.required]],
    Name: ['', [Validators.required]],
    Lastname: ['', [Validators.required]],
    Grad: ['', [Validators.required]],
    Drzava: ['', [Validators.required]],
    NazivAviokompanije: ['', [Validators.required]],
    BrojTelefona: ['', [Validators.required]],
    BrojPasosa: ['', [Validators.required]],
    Passwords: this.fb.group({
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]]
    }, { validator: this.comparePasswords })
  });


  OAuthProvider(provider) {
    return this.afAuth.signInWithPopup(provider).then((res) => {
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      })
    }).catch((error) => {
      window.alert(error);
    })
  }
  
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
    })
  }

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
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
      Drzava: this.userFormModel.value.Drzava,
      BrojTelefona: this.userFormModel.value.BrojTelefona,
      BrojPasosa: this.userFormModel.value.BrojPasosa,
      Password: this.userFormModel.value.Passwords.Password,
      TipKorisnika: 'RegularUser'
    }
    localStorage.setItem('toActivate', body.UserName);
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
      Drzava: this.rentAdminFormModel.value.Drzava,
      NazivKompanije: this.rentAdminFormModel.value.NazivKompanije,
      BrojTelefona: this.rentAdminFormModel.value.BrojTelefona,
      BrojPasosa: this.rentAdminFormModel.value.BrojPasosa,
      Password: this.rentAdminFormModel.value.Passwords.Password,
      TipKorisnika: 'RentAdmin'
    }
    localStorage.setItem('toActivate', body.UserName);
    return this.http.post(this.BaseURI + '/ApplicationUser/RegisterRentAdmin', body);
  }
  registerAdmin() {
    console.debug('callback register')
    var body = {
      Email: this.rentAdminFormModel.value.Email,
      UserName: this.rentAdminFormModel.value.UserName,
      Name: this.rentAdminFormModel.value.Name,
      Lastname: this.rentAdminFormModel.value.Lastname,
      Grad: this.rentAdminFormModel.value.Grad,
      Drzava: this.rentAdminFormModel.value.Drzava,
      NazivKompanije: this.rentAdminFormModel.value.NazivKompanije,
      BrojTelefona: this.rentAdminFormModel.value.BrojTelefona,
      BrojPasosa: this.rentAdminFormModel.value.BrojPasosa,
      Password: this.rentAdminFormModel.value.Passwords.Password,
      TipKorisnika: 'Admin'
    }
    localStorage.setItem('toActivate', body.UserName);
    return this.http.post(this.BaseURI + '/ApplicationUser/RegisterAdmin', body);
  }

  registerAvioAdmin() {
    console.debug('callback register')
    var body = {
      Email: this.avioAdminFormModel.value.Email,
      UserName: this.avioAdminFormModel.value.UserName,
      Name: this.avioAdminFormModel.value.Name,
      Lastname: this.avioAdminFormModel.value.Lastname,
      Grad: this.avioAdminFormModel.value.Grad,
      Drzava: this.avioAdminFormModel.value.Drzava,
      NazivAviokompanije: this.avioAdminFormModel.value.NazivAviokompanije,
      BrojTelefona: this.avioAdminFormModel.value.BrojTelefona,
      BrojPasosa: this.avioAdminFormModel.value.BrojPasosa,
      Password: this.avioAdminFormModel.value.Passwords.Password,
      TipKorisnika: 'AvioAdmin'
    }
    localStorage.setItem('toActivate', body.UserName);
    return this.http.post(this.BaseURI + '/ApplicationUser/RegisterAvioAdmin', body);
  }
  //#endregion
  activateAccount(username: string) {
    console.log(username)
    return this.http.get(this.BaseURI + '/ApplicationUser/ActivateAccount/' + username);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  getUserProfile() {
    var res = this.http.get(this.BaseURI + '/UserProfile/GetUserProfile');
    return res
  }
  getUserProfileByName(username: string): Observable<string> {
    const formData = new FormData();
    formData.append(username, 'username');

    return this.http.post<any>(this.BaseURI + '/UserProfile/GetUserProfileByName', formData);
  }
  getAdminProfile() {
    return this.http.get(this.BaseURI + '/AvioAdmin/GetAvioAdminProfile');
  }

  async UpdateUser(body): Promise<any> {
    return await this.http.post(this.BaseURI + '/ApplicationUser/UpdateUser', body).toPromise();
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
  async ChangePassword(username, oldPass, newPass): Promise<any> {
    const fd = new FormData()
    fd.append(username, '');
    fd.append(oldPass, '');
    fd.append(newPass, '');
    return await this.http.post(this.BaseURI + '/ApplicationUser/ChangePassword', fd).toPromise();
  }

  //social login
  externalLogin(formData) {
    //console.log("sad sledi komunikacija sa backendom")
    //console.log(formData)
    return this.http.post(this.BaseURI + '/ApplicationUser/SocialLogin', formData);
  }
}
