import { Component, OnInit } from '@angular/core';
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
  filijale: any;
  prikaz: number;

  adresa: string;
  grad: string;
  drzava: string;

  constructor(private servce: RentService, private toastr: ToastrService, private router: Router) { }

  async ngOnInit() {
    this.prikaz = 0;
    this.currentUser = AppComponent.currentUser.userName;
    this.filijale = await this.servce.GetFilijale(this.currentUser);
    console.debug(this.filijale);
  }

  Izmeni(Id){
    this.router.navigate(['izmeni-filijalu'], {
      queryParams: {
        id: Id //pass whatever here
      }
    });
  }
  async Obrisi(id){
    await this.servce.ObrisiFilijalu(id);
    this.ngOnInit();
  }
  Dodaj(){
    this.prikaz = 1;
    console.debug('dodaj');
  }
  async onSubmit(){
    let adresa = (<HTMLInputElement>document.getElementById('adresa')).value;
    let grad = (<HTMLInputElement>document.getElementById('grad')).value;
    let drzava = (<HTMLInputElement>document.getElementById('drzava')).value;

    let f = new Filijala(0, this.currentUser, adresa, grad, drzava);
    this.filijale = await this.servce.DodajFilijalu(f);
    this.prikaz = 0;
  }
}
