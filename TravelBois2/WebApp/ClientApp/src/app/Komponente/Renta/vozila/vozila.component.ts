import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/users/user/user';
import { AppComponent } from 'src/app/app.component';
import { RentACarAdmin } from 'src/app/entities/users/rent-a-car-admin/rent-a-car-admin';
import { RentService } from 'src/app/shared/rent.service';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-vozila',
  templateUrl: './vozila.component.html'
})
export class VozilaComponent implements OnInit {
  currentUser: RentACarAdmin;
  kola: Array<any>;
  kompanija: string;
  dodajKola: string;

  constructor(private servis: RentService, private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.currentUser = AppComponent.currentUser as RentACarAdmin;
    this.kola = new Array<any>();
    this.kompanija = this.route.snapshot.paramMap.get('naziv');
    this.dodajKola = '/dodaj-kola/' + this.kompanija;
    this.servis.GetCars(this.currentUser.userName).subscribe(
      (res: any) => {
        res.forEach(element => {
          this.kola.push(element)
        });
      },
      err => {
        console.debug(err);
      }
    )
  }

  AddCar(){}
  EditCar(){}
}
