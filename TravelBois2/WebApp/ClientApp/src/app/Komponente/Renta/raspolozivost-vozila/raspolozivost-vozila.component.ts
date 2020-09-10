import { Component, OnInit } from '@angular/core';
import { RentACarAdmin } from 'src/app/entities/users/rent-a-car-admin/rent-a-car-admin';
import { Kola } from 'src/app/entities/objects/kola';
import { AppComponent } from 'src/app/app.component';
import { RezervacijePrikaz } from 'src/app/_enums';
import { RentService } from 'src/app/shared/rent.service';

@Component({
  selector: 'app-raspolozivost-vozila',
  templateUrl: './raspolozivost-vozila.component.html'
})
export class RaspolozivostVozilaComponent implements OnInit {
  zauzetost: any;

  cu: RentACarAdmin;
  sc: Kola;
  prikaz: RezervacijePrikaz;

  constructor(private servis: RentService) { }

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

  Obrisi(id){
    
  }
}
