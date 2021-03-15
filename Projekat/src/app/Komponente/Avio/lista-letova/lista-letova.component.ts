import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'
import { AppComponent } from 'src/app/app.component';
import { AvioAdmin } from 'src/app/entities/users/avio-admin/avio-admin';
import { element } from 'protractor';
import { Let } from 'src/app/entities/objects/let';
import { AvioKompanija } from 'src/app/entities/objects/avio-kompanija';
import { LetoviService } from '../../../shared/letovi.service';
import { elementAt, find} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-letova',
  templateUrl: './lista-letova.component.html'
})
export class ListaLetovaComponent implements OnInit {
  letHeaders = ['Mesto polaska', 'Mesto dolaska', 'Datum polaska', 'Datum dolaska', 'Klasa','Tip leta','Vreme poletanja', 'Vreme sletanja','Kilometraza', 'Cena' ];
  currentUser: AvioAdmin;
  listaLetova: Array<Let>;
  idLetova: Array<number>;
  public empty = 0;
  aviokompanija: string;

  constructor(private toastr: ToastrService, private service: LetoviService, private router: Router){    
    this.aviokompanija = AppComponent.avioKompanija.naziv;    
  }

  ngOnInit(): void {
    this.getLetovi();
  }

  getLetovi(): void {
    this.listaLetova = new Array<Let>();
    this.idLetova = new Array<number>();
    this.service.getLetovi().subscribe(letovi =>
      letovi.forEach(element => {
        if (element.aviokompanija == this.aviokompanija) {
          this.empty = 1;
          this.listaLetova.push(new Let(this.aviokompanija, element.mestoPolaska, element.mestoDolaska, element.datumPolaska,
            element.vremePoletanja, element.datumDolaska, element.vremeSletanja, element.trajanjePutovanja, element.razdaljinaPutovanja, element.klasaLeta,
            element.tipLeta, element.presedanjaLeta, element.cenaKarte));
          this.idLetova.push(element.id);
        }
      }));
  }

  ukloniLet(i: number) {
    var id = this.idLetova[i];
    this.service.deleteLet(id).subscribe();
    this.listaLetova.splice(i, 1);
    this.idLetova.splice(i,1);
    this.toastr.success('Uspesno ste obrisali let!');
    if (this.listaLetova.length == 0) {
      this.empty = 0;
    }
  }


  DodajLet() {
    this.router.navigateByUrl('/dodaj-let');
    
  }

  onBack() {
    this.router.navigateByUrl('/pocetna');
  }

}
