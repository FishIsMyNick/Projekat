import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ocena } from '../entities/misc/ocena';
import { Observable } from 'rxjs';
import { OcenaLeta } from '../entities/misc/ocena-leta';
import { OcenaAviokompanije } from '../entities/misc/ocena-aviokompanije';

@Injectable({
  providedIn: 'root'
})
export class OcenaService {
  readonly BaseURI = 'http://localhost:49764/api';

  constructor(private http: HttpClient) { }

  oceniAviokompaniju(ocena: OcenaAviokompanije): Observable<OcenaAviokompanije> {
    return this.http.post<OcenaAviokompanije>(this.BaseURI + '/Aviokompanija/AddOcenaAviokompanije', ocena);
  }

  oceniLet(ocena: OcenaLeta): Observable<OcenaLeta> {
    return this.http.post<OcenaLeta>(this.BaseURI + '/Aviokompanija/AddOcenaLeta', ocena);
  }

  getOceneAvio(): Observable<OcenaAviokompanije[]> {
    return this.http.get<OcenaAviokompanije[]>(this.BaseURI + '/Aviokompanija/GetOceneAvio');
  }

  getOceneLeta(): Observable<OcenaLeta[]> {
    return this.http.get<OcenaLeta[]>(this.BaseURI + '/Aviokompanija/GetOceneLeta');
  }
}
