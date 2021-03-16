import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../../app.component';
import { Filijala } from '../../../entities/objects/filijala';
import { RentService } from '../../../shared/rent.service';

@Component({
  selector: 'app-filijale',
  templateUrl: './filijale.component.html'
})
export class FilijaleComponent implements OnInit {

  currentUser: string;
  renta: any;
  filijale: any;
  prikaz: number;

  adresa: string;
  grad: string;
  drzava: string;
  
  filijalaForm: any;

  constructor(public servce: RentService, private toastr: ToastrService, private router: Router, private fb: FormBuilder) { 
    this.filijalaForm = this.fb.group({
      adresa: ['', Validators.required],
      grad: ['', Validators.required],
      drzava: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.currentUser = AppComponent.currentUser.userName;
    this.filijale = await this.servce.GetFilijale(this.currentUser);
    //console.log(this.currentUser, this.filijale)
    if (this.filijale == null) {
      this.filijale = new Array<any>();
    }
    this.renta = await this.servce.GetRent(this.currentUser);
    if (this.renta == null){
      console.log('Admin nema registrovanu rentu')
    }
    this.prikaz = 0;
  }

  Izmeni(Id){
    this.router.navigate(['izmeni-filijalu'], {
      queryParams: {
        id: Id //pass whatever here
      }
    });
  }
  async Obrisi(id){
    let ret = await this.servce.ObrisiFilijalu(id);
    if(ret == null){
      this.toastr.error('Ne mozete obrisati ovu filijalu jer ima kola prijavljenih u njoj!')
    }
    else{
      this.toastr.success('Uspesno obrisana filijala!')
      this.ngOnInit();
    }
  }
  Dodaj(){
    this.prikaz = 1;
    console.debug('dodaj');
  }
  async onSubmit(){
    let adresa = (<HTMLInputElement>document.getElementById('adresa')).value;
    let grad = (<HTMLInputElement>document.getElementById('grad')).value;
    let drzava = (<HTMLInputElement>document.getElementById('drzava')).value;

    let f = new Filijala(0, this.currentUser, this.renta.naziv, adresa, grad, drzava);
    await this.servce.DodajFilijalu(f);
    this.ngOnInit();
  }
}
