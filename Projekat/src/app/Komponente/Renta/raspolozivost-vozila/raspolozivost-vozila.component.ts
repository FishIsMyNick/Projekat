import { Component, OnInit } from '@angular/core';
import { RentACarAdmin } from 'src/app/entities/users/rent-a-car-admin/rent-a-car-admin';
import { Kola } from 'src/app/entities/objects/kola';
import { AppComponent } from 'src/app/app.component';
import { RezervacijePrikaz } from 'src/app/_enums';
import { RentService } from 'src/app/shared/rent.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-raspolozivost-vozila',
  templateUrl: './raspolozivost-vozila.component.html'
})
export class RaspolozivostVozilaComponent implements OnInit {
  zauzetost: any;

  cu: RentACarAdmin;
  sc: Kola;
  prikaz: RezervacijePrikaz;

  constructor(private servis: RentService, private toastr: ToastrService) { }

  async ngOnInit() {
    this.prikaz = RezervacijePrikaz.Rezervacije;
    this.zauzetost = new Array<any>();
    for (let k of await this.servis.GetCarsFromAdmin(AppComponent.currentUser.userName)) {
      var zauz = await this.servis.GetZauzetost(k);
      for (let z of zauz) {
        z.imgURL = 'assets/images/RentACar/Kola/' + z.kola + '.jpg';
        z.od = new Date(z.od);
        z.do = new Date(z.do);
        this.zauzetost.push(z);
      }
    }
    console.debug(this.zauzetost);
  }

  async Obrisi(id){
    let z = await this.servis.DeleteReservation(id);
    let od = new Date(z.od);
    let dok = new Date(z.do);
    let naziv = z.kola.split('-');
    this.toastr.success('Obrisana rezervacija za ' + od.getDate() + '/' + (od.getMonth() + 1) + '/' + od.getFullYear() + '-' + dok.getDate() + '/' + (dok.getMonth() + 1) + '/' + dok.getFullYear() + ' za ' + naziv[0] + ' ' + naziv[1]);
    this.ngOnInit();
  }
}
