import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RentACar } from '../entities/objects/rent-a-car';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Kola } from '../entities/objects/kola';
import { basename } from 'path';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  readonly BaseURI = 'https://localhost:44343/api';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  GetAllRents(){
    return this.http.get(this.BaseURI + '/Rent/GetAllRents');
  }
  async GetRent(adminID: string): Promise<any> {
    const formData = new FormData();
    formData.append(adminID, 'admin');

    return await this.http.post<any>(this.BaseURI + '/Rent/GetRent', formData).toPromise();
  }
  async GetRentByName(name: string): Promise<any>{
    const formData = new FormData();
    formData.append(name, 'name');
    return await this.http.post<any>(this.BaseURI + '/Rent/GetRentByName', formData).toPromise();
  }
  addRentKompanija(rentKompanija: RentACar): Observable<RentACar> {
    return this.http.post<RentACar>(this.BaseURI + '/Rent/AddRent', rentKompanija);
  }
  addRentImage(image: FormData): Observable<Object> {
    return this.http.post(this.BaseURI + '/Rent/AddCompanyImage', image);
  }
  addCarImage(image: FormData): Observable<Object> {
    return this.http.post(this.BaseURI + '/Rent/AddCarImage', image);
  }
  checkForRentAdmin(adminID: string): Observable<string> {
    const formData = new FormData();
    formData.append(adminID, "adminID");

    return this.http.post<any>(this.BaseURI + '/Rent/RentAdminExists', formData)
  }
  async GetCarsFromAdmin(adminID: string): Promise<any> {
    const formData = new FormData();
    formData.append(adminID, 'rentaID');

    return await this.http.post<any>(this.BaseURI + '/Rent/GetCarsFromAdmin', formData).toPromise();
  }
  async GetCarsFromRent(rentaID: string): Promise<any> {
    const formData = new FormData();
    formData.append(rentaID, 'rentaID');

    return await this.http.post<any>(this.BaseURI + '/Rent/GetCarsFromRent', formData).toPromise();
  }
  async GetKola(naziv: string, renta: string): Promise<any> {
    const formData = new FormData();
    formData.append(naziv, 'naziv');
    formData.append(renta, 'renta');
    return await this.http.post<any>(this.BaseURI + '/Rent/GetKola', formData).toPromise();
  }
  AddCar(kola: Kola): Observable<Kola> {
    return this.http.post<Kola>(this.BaseURI + '/Rent/AddCar', kola);
  }
  async GetZauzetost(kola: Kola): Promise<any> {
    var ret = await this.http.post(this.BaseURI + '/Rent/GetZauzetost', kola).toPromise();
    return ret;
  }
  async GetReservations(userID: string) : Promise<any> {
    const formData = new FormData();
    formData.append(userID, 'user');

    return await this.http.post<any>(this.BaseURI + '/Rent/GetReservations', formData).toPromise();
  }
  AddReservation(d1: Date, d2: Date, k: any, user): Observable<any> {
    const formData = new FormData();
    formData.append(d1.getDate() + '/' + 
                    d1.getMonth() + '/' +
                    d1.getFullYear(), 'od')
    formData.append(d2.getDate() + '/' + 
                    d2.getMonth() + '/' +
                    d2.getFullYear(), 'do');
    formData.append(k.naziv, 'kola');
    formData.append(k.nazivRente, 'renta');
    formData.append(user, 'user');
    return this.http.post<any>(this.BaseURI + '/Rent/AddReservation', formData)
  }
  async OceniKola(naziv, renta, ocena, user): Promise<any> {
    const formData = new FormData();
    formData.append(naziv, 'naziv');
    formData.append(renta, 'renta');
    formData.append(ocena, 'ocena');
    formData.append(user, 'user');
    return await this.http.post<any>(this.BaseURI + '/Rent/OceniKola', formData).toPromise();
  }
  async OceniRentu(naziv, ocena, user): Promise<any> {
    const formData = new FormData();
    formData.append(naziv, 'naziv');
    formData.append(ocena, 'ocena');
    formData.append(user, 'user');
    return await this.http.post<any>(this.BaseURI + '/Rent/OceniRentu', formData).toPromise();
  }
  async ProsecnaOcenaKola(kola: Kola): Promise<any> {
    return await this.http.post<any>(this.BaseURI + '/Rent/ProsecnaOcenaKola', kola).toPromise();
  }
  async ProsecnaOcenaRente(renta: RentACar): Promise<any> {
    return await this.http.post<any>(this.BaseURI + '/Rent/ProsecnaOcenaRente', renta).toPromise();
  }
}
