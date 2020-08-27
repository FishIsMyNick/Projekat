import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RentACar } from '../entities/objects/rent-a-car';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Kola } from '../entities/objects/kola';
import { basename } from 'path';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  readonly BaseURI = 'https://localhost:44343/api';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  GetAllRents(){
    return this.http.get(this.BaseURI + '/Rent/GetAllRents');
  }
  async GetRent(adminID: string): Promise<RentACar> {
    const formData = new FormData();
    formData.append(adminID, 'admin');

    return await this.http.post<any>(this.BaseURI + '/Rent/GetRent', formData).toPromise();
  }
  addRentKompanija(rentKompanija: RentACar): Observable<RentACar> {
    return this.http.post<RentACar>(this.BaseURI + '/Rent/AddRent', rentKompanija);
  }
  addRentImage(image: FormData): Observable<Object> {
    return this.http.post(this.BaseURI + '/Rent/AddCompanyImage', image);
  }
  checkForRentAdmin(adminID: string): Observable<string> {
    const formData = new FormData();
    formData.append(adminID, "adminID");

    return this.http.post<any>(this.BaseURI + '/Rent/RentAdminExists', formData)
  }
  GetCars(rentaID: string): Observable<string> {
    const formData = new FormData();
    formData.append(rentaID, 'rentaID');

    return this.http.post<any>(this.BaseURI + '/Rent/GetCars', formData);
  }
  AddCar(kola: Kola): Observable<Kola> {
    return this.http.post<Kola>(this.BaseURI + '/Rent/AddCar', kola);
  }
}
