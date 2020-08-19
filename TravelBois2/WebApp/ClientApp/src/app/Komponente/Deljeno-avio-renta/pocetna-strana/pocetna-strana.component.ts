import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { User } from '../../../entities/users/user/user';
import { RegisteredUser } from '../../../entities/users/registered-user/registered-user';
import { RentACarAdmin } from '../../../entities/users/rent-a-car-admin/rent-a-car-admin'
import { Admin } from '../../../entities/users/admin/admin'
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { UserService } from '../../../shared/user.service';
import { AvioAdmin } from '../../../entities/users/avio-admin/avio-admin';
import { AvioAdminService } from '../../../shared/avio-admin.service';
import { AvioKompanija } from '../../../entities/objects/avio-kompanija';
import { OcenaService } from '../../../shared/ocena.service';
import { Ocena } from '../../../entities/misc/ocena';
import { element } from 'protractor';

@Component({
  selector: 'app-pocetna-strana',
  //template: '{{user}}',
  templateUrl: './pocetna-strana.component.html',
  styleUrls: ['./pocetna-strana.component.css']
})
export class PocetnaStranaComponent implements OnInit {
  currentUser: User;
  userDetails;
  userName: string;
  grad: string;
  name: string;
  lastname: string;
  brojTelefona: string;
  brojPasosa: string;
  tipKorisnika: string;
  aviokompanija: string;
  nazivAvio: string;
  adresaAvio: string;
  gradAvio: string;
  opisAvio: string;


  constructor(private service: UserService, private serviceAvio: AvioAdminService, private serviceO: OcenaService) { }

  ngOnInit(): void {
    this.currentUser = AppComponent.currentUser;
    this.provera();
    this.ucitajAviokompaniju();
    this.ucitajOcene();
  }
  getType() {
    return AppComponent.tipKorisnika;
  }

  provera() {
    this.service.getUserProfile().subscribe(
      res => {
        if (res != null) {
          this.userDetails = res;
          this.userName = this.userDetails.userName;
          this.name = this.userDetails.name;
          this.lastname = this.userDetails.lastname;
          this.brojPasosa = this.userDetails.brojPasosa;
          this.brojTelefona = this.userDetails.brojTelefona;
          this.tipKorisnika = this.userDetails.tipKorisnika;
          this.grad = this.userDetails.grad;
          if (this.tipKorisnika == 'RegularUser') {
            AppComponent.tipKorisnika = "RegisteredUser";
            AppComponent.currentUser = new RegisteredUser(this.brojTelefona, this.grad, this.name, this.lastname, this.userName, this.brojPasosa);            
          }
          else if (this.tipKorisnika == 'AvioAdmin') {
            AppComponent.tipKorisnika = "AvioAdmin";
            this.aviokompanija = this.userDetails.nazivAviokompanije;
            AppComponent.currentUser = new AvioAdmin(this.brojTelefona, this.grad, this.name, this.lastname, this.userName, this.aviokompanija);
            this.ucitajAviokompaniju();
          }
          else if (this.tipKorisnika == 'RentaAdmin') {
            AppComponent.tipKorisnika = "RentACarAdmin";

          }
          else {
            AppComponent.tipKorisnika = "Admin";
          }

        }
        else {
          AppComponent.currentUser = new User();
          AppComponent.tipKorisnika = "User";
        }
      },
      err => {

        console.log(err);
      },
    );
  }


  ucitajAviokompaniju() {
    this.serviceAvio.getAviokompanije().subscribe(aviokompanije => {
      aviokompanije.forEach(element => {
        if (element.naziv == this.aviokompanija) {
          this.nazivAvio = element.naziv;
          this.adresaAvio = element.adresa;
          this.opisAvio = element.opis;
          this.gradAvio = element.grad;
          AppComponent.avioKompanija = new AvioKompanija(this.nazivAvio, this.adresaAvio, this.gradAvio, this.opisAvio);
        }
      })
    });   
  }
  ucitajOcene() {
    AppComponent.OceneAviokompanije = new Array<{ ocena: number, nazivKompanije:string}>();
    this.serviceO.getOceneAvio().subscribe(ocene => {
      ocene.forEach(element => {
        AppComponent.OceneAviokompanije.push({ ocena: element.value, nazivKompanije: element.kompanija })
      })
    });
  }


  

}

