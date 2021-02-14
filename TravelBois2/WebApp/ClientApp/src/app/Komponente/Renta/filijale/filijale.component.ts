import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../../app.component';
import { RentService } from '../../../shared/rent.service';

@Component({
  selector: 'app-filijale',
  templateUrl: './filijale.component.html'
})
export class FilijaleComponent implements OnInit {

  filijale: any;

  constructor(private servis: RentService, private toastr: ToastrService) { }

  async ngOnInit() {
    this.filijale = await this.servis.GetFilijale(AppComponent.currentUser.userName);
    console.debug(this.filijale);
  }

  Izmeni(eventName){
    console.debug('izmeni ' + eventName);
  }
  Dodaj(){
    console.debug('dodaj');
  }
}
