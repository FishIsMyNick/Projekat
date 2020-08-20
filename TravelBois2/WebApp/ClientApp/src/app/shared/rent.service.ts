import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RentACar } from '../entities/objects/rent-a-car';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  readonly BaseURI = 'https://localhost:44343/api';

  constructor(private http: HttpClient) { }

  GetAllRents(){
    return this.http.get(this.BaseURI + '/Rent/GetAllRents');
  }
  GetRent(naziv){
    return this.http.get(this.BaseURI + 'Rent/GetRent', naziv)
  }
  addRentKompanija(rentKompanija: RentACar): Observable<RentACar> {
    return this.http.post<RentACar>(this.BaseURI + '/Rent/AddRent', rentKompanija);
  }
  addRentImage(image: FormData): Observable<Object> {
    return this.http.post(this.BaseURI + '/Rent/AddCompanyImage', image);
  }
  checkForRentAdmin(adminID: string) {
    return this.http.post(this.BaseURI + '/Rent/RentAdminExists', adminID)
  }
}
