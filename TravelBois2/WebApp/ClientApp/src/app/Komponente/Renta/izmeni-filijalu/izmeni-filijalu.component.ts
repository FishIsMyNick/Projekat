import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private service: RentService){}
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
  }

}
