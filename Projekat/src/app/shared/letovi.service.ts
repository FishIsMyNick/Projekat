import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Let } from '../entities/objects/let';
import { Sediste } from '../entities/objects/sediste';
import { Pozivnica } from '../entities/objects/pozivnica';
import { Presedanje } from '../entities/objects/presedanje';
import { BrzaRezervacija } from '../entities/objects/brza-rezervacija';

@Injectable({
  providedIn: 'root'
})
export class LetoviService {
  readonly BaseURI = 'http://localhost:49764/api';

  constructor(private http: HttpClient) { }

  addLet(letic: Let): Observable<Let> {
    return this.http.post<Let>(this.BaseURI + '/Aviokompanija/AddLet', letic);
  }

  getLetovi(): Observable<Let[]> {
    return this.http.get<Let[]>(this.BaseURI + '/Aviokompanija/GetLetovi');
  }

  getPresedanja(): Observable<Presedanje[]> {
    return this.http.get<Presedanje[]>(this.BaseURI + '/Aviokompanija/GetPresedanja');
  }

  deleteLet(id: number): Observable<any> {
    return this.http.delete(this.BaseURI + '/Aviokompanija/DeleteLet/' + id);
  }

  rezervisiSediste(sediste: Sediste): Observable<Sediste> {
    return this.http.post<Sediste>(this.BaseURI + '/Aviokompanija/AddSediste', sediste);
  }

  getSediste(): Observable<Sediste[]> {
    return this.http.get<Sediste[]>(this.BaseURI + '/Aviokompanija/GetSedista');
  }

  getBrzeRezervacije(): Observable<BrzaRezervacija[]> {
    return this.http.get<BrzaRezervacija[]>(this.BaseURI + '/Aviokompanija/GetBrzeRezervacije');
  }

  addBrzaRezervacija(brzaRezervacija: BrzaRezervacija): Observable<BrzaRezervacija> {
    return this.http.post<BrzaRezervacija>(this.BaseURI + '/Aviokompanija/AddBrzaRezervacija', brzaRezervacija);
  }

  deleteBrzaRezervacija(id: number): Observable<any> {
    return this.http.delete(this.BaseURI + '/Aviokompanija/DeleteBrzaRezervacija/' + id);
  }

  posaljiPozivnicu(pozivnica: Pozivnica): Observable<Pozivnica> {
    return this.http.post<Pozivnica>(this.BaseURI + '/Aviokompanija/AddPozivnica', pozivnica);
  }

  getPozivnice(): Observable<Pozivnica[]> {
    return this.http.get<Pozivnica[]>(this.BaseURI + '/Aviokompanija/GetPozivnice');
  }

  deletePozivnicu(id: number): Observable<any> {
    return this.http.delete(this.BaseURI + '/Aviokompanija/DeletePozivnica/' + id);
  }

  deleteSediste(idLeta: number, idSedista: string): Observable<any> {
    return this.http.delete(this.BaseURI + '/Aviokompanija/DeleteSediste/' + idLeta + '/' + idSedista);
  }

  izmeniSediste(idLeta: number, idSedista: string): Observable<any> {
    return this.http.delete(this.BaseURI + '/Aviokompanija/IzmeniSediste/' + idLeta + '/' + idSedista);
  }
}
