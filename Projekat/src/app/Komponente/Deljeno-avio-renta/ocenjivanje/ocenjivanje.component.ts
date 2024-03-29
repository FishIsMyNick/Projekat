import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { OcenaService } from '../../../shared/ocena.service';
import { RegisteredUser } from '../../../entities/users/registered-user/registered-user';
import { AppComponent } from '../../../app.component';
import { Ocena } from '../../../entities/misc/ocena';
import { AvioAdminService } from '../../../shared/avio-admin.service';
import { element } from 'protractor';
import { AvioKompanija } from '../../../entities/objects/avio-kompanija';
import { OcenaAviokompanije } from '../../../entities/misc/ocena-aviokompanije';

@Component({
  selector: 'app-ocenjivanje',
  templateUrl: './ocenjivanje.component.html'
})
export class OcenjivanjeComponent implements OnInit {
  kompanija: string;
  value: number;
  rating = 0;
  empty = 0;
  currentUser: RegisteredUser;
  ocena: OcenaAviokompanije;
  aviokompanija: AvioKompanija;
  poruka: string;
  hovered: number;
  isRating: boolean;
  readOnly: string;
  t: string = '<div class="rate"><input type="radio" id="star5" name="rate" value="5" /><label for="star5" title="text">5 stars</label><input type="radio" id="star4" name="rate" value="4" /><label for="star4" title="text">4 stars</label><input type="radio" id="star3" name="rate" value="3" /><label for="star3" title="text">3 stars</label><input type="radio" id="star2" name="rate" value="2" /><label for="star2" title="text">2 stars</label><input type="radio" id="star1" name="rate" value="1" /><label for="star1" title="text">1 star</label></div>'

  constructor(private route: ActivatedRoute, private location: Location, private service: OcenaService, private serviceA: AvioAdminService) {
    this.currentUser = <RegisteredUser>AppComponent.currentUser;
  }

  ngOnInit(): void {
    this.kompanija = this.route.snapshot.paramMap.get("naziv");
    this.service.getOceneAvio().subscribe(ocene => {
      ocene.forEach(element => {
        if (element.userID == this.currentUser.userName && element.kompanija == this.kompanija) {
          this.empty = 1;
          this.poruka = "Vec ste ocenili aviokompaniju!";
        }
      })
    });
  }
  onRateChange(rating: number) {
    this.value = rating;
    this.empty = 1;
    this.poruka = "Hvala na oceni!";

    this.ocena = new OcenaAviokompanije(this.value, this.currentUser.userName, this.kompanija);
    this.service.oceniAviokompaniju(this.ocena).subscribe();
    
  }

  onBack() {
    this.location.back();
  }

}
