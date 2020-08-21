import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RentACar } from '../entities/objects/rent-a-car';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  readonly BaseURI = 'https://localhost:44343/api';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  GetAllRents(){
    return this.http.get(this.BaseURI + '/Rent/GetAllRents');
  }
  GetRent(naziv: string, adminID: string){
    let params = {naziv, adminID}
    //return this.http.get(this.BaseURI + 'Rent/GetRent', params)
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
}
