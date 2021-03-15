import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { RentACar } from 'src/app/entities/objects/rent-a-car';
import { RentACarAdmin } from 'src/app/entities/users/rent-a-car-admin/rent-a-car-admin';
import { RentService } from 'src/app/shared/rent.service';

@Component({
  selector: 'app-info-stranica',
  templateUrl: './info-stranica.component.html'
})
export class InfoStranicaComponent implements OnInit {
  currentUser: RentACarAdmin;
  renta: any;

  constructor(private servis: RentService, private toastr: ToastrService) { }

  async ngOnInit() {
    this.currentUser = AppComponent.currentUser as RentACarAdmin;
    this.renta = await this.servis.GetRent(this.currentUser.userName);
  }

  async Save() {
    this.renta.grad = (<HTMLInputElement>document.getElementById('grad')).value;
    this.renta.drzava = (<HTMLInputElement>document.getElementById('drzava')).value;
    this.renta.adresa = (<HTMLInputElement>document.getElementById('adresa')).value;
    this.renta.opis = (<HTMLInputElement>document.getElementById('opis')).value;
    let ret = await this.servis.UpdateRent(this.renta);
    this.toastr.success("Informacije su uspesno azurirane!")
  }
}
