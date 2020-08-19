import { Component, OnInit } from '@angular/core';
import { Let } from '../../../entities/objects/let';
import { AppComponent } from '../../../app.component';
import { LetoviService } from '../../../shared/letovi.service';
import { element } from 'protractor';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brze-rezervacije-admin',
  templateUrl: './brze-rezervacije-admin.component.html'
})
export class BrzeRezervacijeAdminComponent implements OnInit {
  letHeaders = ['Mesto polaska', 'Mesto dolaska', 'Datum polaska', 'Datum dolaska', 'Vreme poletanja', 'Vreme sletanja', 'Klasa', 'Tip puta', 'Cena'];
  letovi: Array<Let>;
  idLetova: Array<number>;

  aviokompanija: string;

  constructor(private service: LetoviService, private location: Location, private router: Router) {
    this.aviokompanija = AppComponent.avioKompanija.naziv;

    this.ucitajLetove();
  }

  ngOnInit(): void {
  }

  ucitajLetove() {
    this.letovi = new Array<Let>();
    this.idLetova = new Array<number>();

    this.service.getLetovi().subscribe(letovi => {
      letovi.forEach(element => {
        if (element.aviokompanija == this.aviokompanija) {
          this.letovi.push(element);
          this.idLetova.push(element.id);
        }
      })
    });
  }

  Napravi(i: number) {
    var id = this.idLetova[i];
    this.router.navigateByUrl('/let-brza-rezervacija/'  + id);
  }

  onBack() {
    this.location.back();
  }

}
