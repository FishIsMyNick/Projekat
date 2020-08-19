import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RentACar } from '../entities/objects/rent-a-car';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class RentAdminService {

  readonly BaseURI = 'https://localhost:44343/api';

  constructor(private fb:FormBuilder, private http: HttpClient) { }

  addRentKompanija(rentKompanija: RentACar): Observable<RentACar> {
    return this.http.post<RentACar>(this.BaseURI + '/Rent/AddRent', rentKompanija);
  }

  addRentImage(image: FormData): Observable<Object> {
    return this.http.post(this.BaseURI + '/Rent/AddCompanyImage', image);
  }
}
