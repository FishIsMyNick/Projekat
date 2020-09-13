import { Component, OnInit } from '@angular/core';
import { RentService } from 'src/app/shared/rent.service';
import { AppComponent } from 'src/app/app.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cenovnik',
  templateUrl: './cenovnik.component.html'
})
export class CenovnikComponent implements OnInit {

  kola: any;

  constructor(private servis: RentService, private toastr: ToastrService) { }

  async ngOnInit() {
    this.kola = await this.servis.GetCarsFromAdmin(AppComponent.currentUser.userName);
    console.debug(this.kola);
    for(let k of this.kola){
      k.imgURL = 'assets/images/RentACar/Kola/' + k.naziv + '.jpg';
    }
  }
  async Sacuvaj(name){
    let cena = (<HTMLInputElement>document.getElementById(name + 'R')).value;
    let cenaBR = (<HTMLInputElement>document.getElementById(name + 'B')).value;
    let naziv = name.split('+');

    await this.servis.UpdateCarPrice(naziv[0], naziv[1], cena, cenaBR);

    var kola = naziv[0].split('-');
    let marka = kola[0];
    let model = kola[1];
    this.toastr.success("Uspesno ste azurirali cenu za kola: " + marka + ' ' + model + '!');
  }
}
