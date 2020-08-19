import { Component, OnInit } from '@angular/core';
import { RegisteredUser } from '../../../entities/users/registered-user/registered-user';
import { AppComponent } from '../../../app.component';
import { TipVozila } from '../../../_enums';
import { Router } from '@angular/router';
import { LetoviService } from '../../../shared/letovi.service';
import { element } from 'protractor';
import { Let } from '../../../entities/objects/let';
import { BrzaRezervacija } from '../../../entities/objects/brza-rezervacija';
import { Sediste } from '../../../entities/objects/sediste';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brze-rezervacije',
  templateUrl: './brze-rezervacije.component.html'
})
export class BrzeRezervacijeComponent implements OnInit {
  currentUser : RegisteredUser;
  letHeaders = ['Aviokompanija', 'Mesto polaska', 'Mesto dolaska', 'Datum polaska', 'Datum dolaska', 'Vreme poletanja', 'Vreme sletanja', 'Sediste','Originalna cena', 'Cena s popustom' ];
  letData: Array<Array<string>>;
  letovi: Array<Let>;
  idLetova: Array<number>;
  idBrzihRezervacija: Array<number>;
  brzeRezervacije: Array<BrzaRezervacija>;
  empty: number;

  kolaHeaders = ['Rent-A-Car', 'Marka', 'Model', 'Godiste', 'Broj mesta', 'Tip', 'Cena po danu', 'Prosecna ocena'];
  kolaData: Array<Array<string>>;


  constructor(private router: Router, private service: LetoviService, private toastr: ToastrService) { 
    this.currentUser = <RegisteredUser>AppComponent.currentUser ;
    this.letData = new Array<Array<string>>();
    this.kolaData = new Array<Array<string>>();
    this.empty = 0;

    this.ucitajLetove();
    this.ucitajBrzeRezervacije();
    
  }
  ngOnInit(): void {}

  prikazi() {
    this.brzeRezervacije.forEach(element => {
      this.idLetova.forEach(letic => {
        if (element.idLeta == letic) {
          var index = this.idLetova.indexOf(letic);      
          this.empty = 1;
          let temp = new Array<string>();
          temp.push(this.letovi[index].aviokompanija);
          temp.push(this.letovi[index].mestoPolaska);
          temp.push(this.letovi[index].mestoDolaska);
          temp.push(this.letovi[index].datumPolaska);
          temp.push(this.letovi[index].datumDolaska);
          temp.push(this.letovi[index].vremePoletanja);
          temp.push(this.letovi[index].vremeSletanja);
          temp.push(element.idSedista);
          temp.push(this.letovi[index].cenaKarte.toString());
          temp.push(element.cenaSedista.toString())
          temp.push(letic.toString());
          this.letData.push(temp);
        }
      })
    })

    if (this.letData.length == 0) {
      this.empty = 2;
    }
  }

  ucitajLetove() {
    this.idLetova = new Array<number>();
    this.letovi = new Array<Let>();
    this.service.getLetovi().subscribe(letovi => {
      letovi.forEach(element => {
        this.idLetova.push(element.id);
        this.letovi.push(new Let(element.aviokompanija, element.mestoPolaska, element.mestoDolaska, element.datumPolaska, element.vremePoletanja, element.datumDolaska,
          element.vremeSletanja, element.trajanjePutovanja, element.razdaljinaPutovanja, element.klasaLeta, element.tipLeta, element.presedanjaLeta, element.cenaKarte));
      })
    });
  }

  ucitajBrzeRezervacije() {
    this.idBrzihRezervacija = new Array<number>();
    this.brzeRezervacije = new Array<BrzaRezervacija>();
    this.service.getBrzeRezervacije().subscribe(brze => {
      brze.forEach(element => {
        this.idBrzihRezervacija.push(element.id);
        this.brzeRezervacije.push(new BrzaRezervacija(element.idLeta, element.idSedista, element.cenaSedista));
      })
    });
  }

  RezervisiLet(i: number) {
    var idLeta = this.letData[i][10];
    var idSedista = this.letData[i][7];
    var idBrzeRezervacije = this.idBrzihRezervacija[i];
    var cenaSedista = this.letData[i][9];
    var sediste = new Sediste(parseInt(idLeta), idSedista, this.currentUser.Ime, this.currentUser.Prezime, this.currentUser.BrojPasosa, true, parseInt(cenaSedista));

    this.rezervisi(sediste, idBrzeRezervacije);
    this.letData.splice(i, 1);
    if (this.letData.length == 0) {
      this.empty = 2;
    }
    this.toastr.success("Uspesno ste rezervisali mesto na letu!")
  }

  rezervisi(sediste: Sediste, idBrzeRezervacije: number) {
    this.service.rezervisiSediste(sediste).subscribe();
    this.service.deleteBrzaRezervacija(idBrzeRezervacije).subscribe();
  }
  RezervisiKola() { }

  onBack() {
    this.router.navigateByUrl('/pocetna');
  }
}
