import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aerodrom } from '../entities/objects/aerodrom';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class DestinacijeService {
  readonly BaseURI = 'http://localhost:49764/api';

  constructor(private http: HttpClient) { }

  addDestinacija(aerodrom: Aerodrom): Observable<Aerodrom> {
    return this.http.post<Aerodrom>(this.BaseURI + '/Aviokompanija/AddAerodrom', aerodrom);
  }

  getAerodromi(): Observable<Aerodrom[]> {
    return this.http.get<Aerodrom[]>(this.BaseURI + '/Aviokompanija/GetAerodromi').pipe();
  }

  deleteAerodrom(grad: string): Observable<any>{
    return this.http.delete(this.BaseURI + '/Aviokompanija/DeleteAerodrom/'+ grad );
  }
}
