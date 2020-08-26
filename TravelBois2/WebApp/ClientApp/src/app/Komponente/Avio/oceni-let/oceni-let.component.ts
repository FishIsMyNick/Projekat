import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { RegisteredUser } from '../../../entities/users/registered-user/registered-user';
import { AppComponent } from '../../../app.component';
import { OcenaLeta } from '../../../entities/misc/ocena-leta';
import { OcenaService } from '../../../shared/ocena.service';
import { element } from 'protractor';

@Component({
  selector: 'app-oceni-let',
  templateUrl: './oceni-let.component.html'
})
export class OceniLetComponent implements OnInit {
  currentUser: RegisteredUser;
  relacija: string;
  rating = 0;
  value: number;
  empty: number;
  id: number;
  ocena: OcenaLeta;
  poruka: string;

  constructor(private route: ActivatedRoute, private location: Location, private service: OcenaService) {
    this.currentUser = <RegisteredUser>AppComponent.currentUser;
    this.empty = 0;
  }

  ngOnInit(): void {
    this.relacija = this.route.snapshot.paramMap.get("relacija");
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.service.getOceneLeta().subscribe(ocene => {
      ocene.forEach(element => {
        if (element.userID == this.currentUser.userName && element.idLeta == this.id) {
          this.empty = 1;
          this.poruka = "Vec ste ocenili let!";
        }
      })
    });
  }

  onRateChange(rating: number) {
    this.value = rating;
    this.ocena = new OcenaLeta(this.value, this.currentUser.userName, this.id);
    this.service.oceniLet(this.ocena).subscribe();

    this.poruka = "Hvala na oceni!";
    this.empty = 1;
  }

  onBack() {
    this.location.back();
  }

}
