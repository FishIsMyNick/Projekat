import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  readonly BaseURI = 'https://localhost:44343/api';

  constructor(private http: HttpClient) { }

  GetAllRents(){
    return this.http.get(this.BaseURI + '/Rent/GetAllRents');
  }
  GetRent(naziv: string, adminID: string){
    let params = {naziv, adminID}
    //return this.http.get(this.BaseURI + 'Rent/GetRent', params)
  }
}
