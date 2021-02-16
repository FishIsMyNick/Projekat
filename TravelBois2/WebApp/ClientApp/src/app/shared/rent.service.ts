import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RentACar } from '../entities/objects/rent-a-car';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Kola } from '../entities/objects/kola';
import { basename } from 'path';
import { promise } from 'protractor';
import { TipVozila } from '../_enums';
import { Filijala } from '../entities/objects/filijala';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  readonly BaseURI = 'https://localhost:44343/api';


  constructor(private http: HttpClient, private fb: FormBuilder) { }

  filijalaForm = this.fb.group({
    adresa: ['', Validators.required],
    grad: ['', Validators.required],
    drzava: ['', Validators.required]
  });

  editCarForm = this.fb.group({
    brojMesta: ['', [Validators.required]],
    filijala: ['', [Validators.required]],
    cena: ['', [Validators.required]],
    godiste: ['', Validators.required],
    model: ['', Validators.required],
    marka: ['', Validators.required],
    nazivRente: ['', Validators.required],
    tipVozila: ['', Validators.required]
  });

  InitEditFilijalaForm(filijala: Filijala){
    this.filijalaForm.controls.adresa.patchValue(filijala.adresa);
    this.filijalaForm.controls.adresa.markAsTouched();
    this.filijalaForm.controls.grad.patchValue(filijala.grad);
    this.filijalaForm.controls.grad.markAsTouched();
    this.filijalaForm.controls.drzava.patchValue(filijala.drzava);
    this.filijalaForm.controls.drzava.markAsTouched();
  }
  InitEditCarForm(kola: any) {
    let naziv = kola.naziv.split('-');
    let marka = naziv[0];
    let model = naziv[1];
    let tip = TipVozila[kola.tipVozila];
    //this.editCarForm.controls.marka.setValue(marka);
    this.editCarForm.controls.marka.patchValue(marka);
    this.editCarForm.controls.marka.markAsTouched();
    this.editCarForm.controls.model.patchValue(model);
    this.editCarForm.controls.model.markAsTouched();

    this.editCarForm.controls.godiste.patchValue(kola.godiste);
    this.editCarForm.controls.godiste.markAsTouched();

    
    this.editCarForm.controls.cena.patchValue(kola.cena);
    this.editCarForm.controls.cena.markAsTouched();

    this.editCarForm.controls.brojMesta.patchValue(kola.brojMesta);
    this.editCarForm.controls.brojMesta.markAsTouched();

    this.editCarForm.controls.brzaRezervacija.patchValue(kola.brzaRezervacija);
    this.editCarForm.controls.brzaRezervacija.markAsTouched();

    this.editCarForm.controls.tipVozila.patchValue(tip);
    this.editCarForm.controls.tipVozila.markAsTouched();

  }

  async DodajFilijalu(filijala): Promise<any>{
    return await this.http.post(this.BaseURI + '/Rent/DodajFilijalu', filijala).toPromise();
  }

  async IzmeniFilijalu(nova: Filijala): Promise<any> {
    //let f = new Filijala(nova.id, nova.adminID, nova.adresa, nova.grad, nova.drzava)
    return await this.http.post(this.BaseURI + '/Rent/IzmeniFilijalu', nova).toPromise();
  }
  async ObrisiFilijalu(id){
    const formData = new FormData();
    formData.append(id, id);

    return await this.http.post<any>(this.BaseURI + '/Rent/ObrisiFilijalu', formData).toPromise();
  }
  GetAllRents(){
    return this.http.get(this.BaseURI + '/Rent/GetAllRents');
  }
  async GetFilijale(adminID: string): Promise<any>{
    const formData = new FormData();
    formData.append(adminID, adminID);

    return await this.http.post<any>(this.BaseURI + '/Rent/GetFilijale', formData).toPromise();
  }
  async GetFilijalaById(id: string): Promise<any> {
    const formData = new FormData();
    formData.append(id, id);
    return await this.http.post<any>(this.BaseURI + '/Rent/GetFilijalaById', formData).toPromise();
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
  async UpdateRent(renta: RentACar): Promise<any> {
    console.debug(renta);
    return await this.http.post(this.BaseURI + '/Rent/UpdateRent', renta).toPromise();
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
  async UpdateCarImage(image: any, newName: string): Promise<any> {
    const fd = new FormData();
    fd.append(image.name, image, newName);

    return this.http.post<any>(this.BaseURI + '/Rent/UpdateCarImage', fd);
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
  async GetAllCars(): Promise<any> {
    return await this.http.get(this.BaseURI + '/Rent/GetAllCars').toPromise();
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
  async UpdateCarPrice(kola, renta, novaCena, novaCenaBR): Promise<any> {
    const formData = new FormData();
    formData.append(kola, 'kola');
    formData.append(renta, 'kola');
    formData.append(novaCena, novaCena);
    formData.append(novaCenaBR, '');
    return await this.http.post<any>(this.BaseURI + '/Rent/UpdateCarPrice', formData).toPromise();
  }
  async UpdateCar(kola: any): Promise<any> {
    const fd = new FormData();
    fd.append(kola.naziv, '');
    fd.append(kola.nazivRente, '');
    fd.append(kola.brojMesta, '');
    fd.append(kola.godiste, '');
    fd.append(kola.cena, '');
    fd.append(kola.filijala, '');
    fd.append(kola.tipVozila, '');
    return await this.http.post<any>(this.BaseURI + '/Rent/UpdateCar', fd).toPromise();
  }
  async ReplaceCar(kola: any, newMarka, newModel): Promise<any> {
    const formData = new FormData();
    formData.append(kola.naziv, '');
    formData.append(kola.brojMesta, '');
    formData.append(kola.godiste, '');
    formData.append(kola.cena, '');
    formData.append(kola.filijala, '');
    formData.append(kola.tipVozila, '');
    formData.append(newMarka, '');
    formData.append(newModel, '');
    formData.append(kola.nazivRente, '');
    return await this.http.post<any>(this.BaseURI + '/Rent/ReplaceCar', formData).toPromise();
  }
  async DeleteCar(kola: Kola): Promise<any> {
    return await this.http.post(this.BaseURI + '/Rent/DeleteCar', kola).toPromise();
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
  async DeleteReservation(id): Promise<any> {
    const fd = new FormData();
    fd.append(id, '');
    return await this.http.post(this.BaseURI + '/Rent/DeleteReservation', fd).toPromise()
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
  async Refresh(): Promise<any> {
    return await this.http.get(this.BaseURI + '/Rent/Refresh');
  }
}
