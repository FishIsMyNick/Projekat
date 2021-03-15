import { Component, OnInit } from '@angular/core';
import { AvioAdmin } from 'src/app/entities/users/avio-admin/avio-admin';
import { AppComponent } from 'src/app/app.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { element } from 'protractor';
import { Let } from 'src/app/entities/objects/let';
import { LetoviComponent } from '../letovi/letovi.component';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { LetoviService } from '../../../shared/letovi.service';
import { Router } from '@angular/router';
import { OcenaService } from '../../../shared/ocena.service';

@Component({
  selector: 'app-izvestaj-o-poslovanju-avio',
  templateUrl: './izvestaj-o-poslovanju-avio.component.html'
})
export class IzvestajOPoslovanjuAvioComponent implements OnInit {
  currentUser: AvioAdmin;
  LetSelectForm: FormGroup;
  NedeljaSelectForm: FormGroup;
  MesecSelectForm: FormGroup;
  GodinaSelectForm: FormGroup;
  toDate: NgbDateStruct;
  prihodNedelje: number;
  prihodMeseca: number;
  prihodGodine: number;
  Letovi = new Array<number>();
  Nedelje = new Array<number>();
  Meseci = new Array<string>();
  Godine = new Array<number>();

  OcenaAviokompanije = 0;
  brojocenaAviokompanije = 0;
  OcenaLeta = 0;
  brojOcenaLeta = 0;
  prosecnaOcenaLeta = 0;

  constructor(private service: LetoviService, public fb: FormBuilder, calendar: NgbCalendar, private router: Router, private serviceO: OcenaService) {
    var CurrntMonth: string[] = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Octobar", "Novembar", "Decembar",];
    this.Godine.push(2019);

    ///////
    this.LetSelectForm = this.fb.group({
      selectedLet: ['']
    });

    this.NedeljaSelectForm = this.fb.group({
      selectedNedelja: ['']
    });

    this.MesecSelectForm = this.fb.group({
      selectedMesec: ['']
    });

    this.GodinaSelectForm = this.fb.group({
      selectedGodina: ['']
    });
    ////////////////////////////////////////punjenje lista

    var broj = this.GetWeekNmbr(new Date());
    var pocetak = 0;
    do {
      pocetak += 1;
      this.Nedelje.push(pocetak);
    } while (pocetak !== broj)

    var br = 0;
    do {
      this.Meseci.push(CurrntMonth[br]);
      br += 1;
    }
    while (br <= this.getMonth())
    /////////////////////////////

    this.currentUser = AppComponent.currentUser as AvioAdmin;

    this.Letovi = new Array<number>();

    this.service.getLetovi().subscribe(letovi => {
      letovi.forEach(element => {
        if (element.aviokompanija == AppComponent.avioKompanija.naziv) {
          this.Letovi.push(element.id);
        }        
      })
    });

    this.serviceO.getOceneAvio().subscribe(ocene => {
      ocene.forEach(element => {
        if (element.kompanija == AppComponent.avioKompanija.naziv) {
          this.OcenaAviokompanije += element.value;
          this.brojocenaAviokompanije += 1;
        }
      })
    });

    
  }

  ngOnInit(): void {
  }

  GetWeekNmbr(dt) {
    var tdt = new Date(dt.valueOf());
    var dayn = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    var firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - tdt.valueOf()) / 604800000);
  }

  getMonth(): number {
    var month = new Date();
    var CrrntMonth = month.getMonth();
    return CrrntMonth;
  }  



  GetOcena() {
    return this.OcenaAviokompanije / this.brojocenaAviokompanije;
  }

  GetOcenaLeta() {
    if (this.OcenaLeta != 0) {
      return this.OcenaLeta / this.brojOcenaLeta;
    }
    else {
      return "Nema ocena!";
    }
    
  }

  LetChanged(e) {
    this.OcenaLeta = 0;
    var letId = this.LetSelectForm.get('selectedLet').value;
    this.serviceO.getOceneLeta().subscribe(ocene => {
      ocene.forEach(element => {
        if (element.idLeta == letId) {
          this.OcenaLeta += element.value;
          this.brojOcenaLeta += 1;
        }
      })
    })
  }

  NedeljaChanged(e) {
    //this.prihodNedelje =   ///IZRACUNATI PRIHOD U OVOJ NEDELJI
  }

  MesecChanged(e) {
    //this.prihodMeseca =  ///IZRACUNATI PRIHOD U MESECU
  }

  GodinaChanged(e) {
    //this.prihodGodine =      ///IZRACUNATI PRIHOD GODINE
  }

  onBack(){
    this.router.navigateByUrl('/pocetna');
  }

}
