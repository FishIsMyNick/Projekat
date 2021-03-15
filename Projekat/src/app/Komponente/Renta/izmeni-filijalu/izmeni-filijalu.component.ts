import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'firebase';
import { AppComponent } from '../../../app.component';
import { Filijala } from '../../../entities/objects/filijala';
import { RentService } from '../../../shared/rent.service';

@Component({
  selector: 'app-izmeni-filijalu',
  templateUrl: './izmeni-filijalu.component.html'
})
export class IzmeniFilijaluComponent implements OnInit {

  currentUser: string;
  filijala: Filijala;
  Id: any;
  test: string;

  constructor(private route: ActivatedRoute, public service: RentService, private router: Router){}
  // constructor(private route: ActivatedRoute, private location: Location, private service : RentService) {
  //   this.currentUser = AppComponent.currentUser.userName;
  // }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.debug(params.id);
      this.Id = params.id;
    });
    console.debug('izasao')
    this.filijala = await this.service.GetFilijalaById(this.Id)
    this.service.InitEditFilijalaForm(this.filijala);
  }

  async SacuvajIzmene(){
    let adresa = (<HTMLInputElement>document.getElementById('adresa')).value;
    let grad = (<HTMLInputElement>document.getElementById('grad')).value;
    let drzava = (<HTMLInputElement>document.getElementById('drzava')).value;
    let nova = new Filijala(this.filijala.id, this.filijala.adminID, this.filijala.renta, adresa, grad, drzava);

    await this.service.IzmeniFilijalu(nova);
    this.router.navigateByUrl('/filijale');
  }

}
