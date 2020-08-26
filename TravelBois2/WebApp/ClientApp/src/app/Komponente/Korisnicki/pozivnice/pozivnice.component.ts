import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LetoviService } from '../../../shared/letovi.service';
import { element } from 'protractor';
import { Pozivnica } from '../../../entities/objects/pozivnica';
import { RegisteredUser } from '../../../entities/users/registered-user/registered-user';
import { AppComponent } from '../../../app.component';
import { Let } from '../../../entities/objects/let';
import { ToastrService } from 'ngx-toastr';
import { Sediste } from '../../../entities/objects/sediste';

@Component({
  selector: 'app-pozivnice',
  templateUrl: './pozivnice.component.html'
})
export class PozivniceComponent implements OnInit {
  empty: number;
  currentUser: RegisteredUser;
  letHeaders = ['Aviokompanija', 'Mesto polaska', 'Mesto dolaska', 'Datum polaska', 'Datum dolaska', 'Vreme poletanja','Vreme sletanja', 'Cena', 'Poslao pozivnicu'];
  letData: Array<Array<string>>;
  pozivnice: Array<Pozivnica>;
  idLetova: Array<{ idLeta: number, pozvaoUsername: string, idPozivnice: number, idSedista: string }>;
  sediste: Sediste;

  constructor(private router: Router, private service: LetoviService, private toastr: ToastrService) {
    this.currentUser = <RegisteredUser>AppComponent.currentUser;
    

    
  }

  ngOnInit(): void {
    this.empty = 0;
    this.idLetova = new Array<{ idLeta: number, pozvaoUsername: string, idPozivnice: number, idSedista: string }>();
    this.pozivnice = new Array<Pozivnica>();

    this.service.getPozivnice().subscribe(pozivnice => {
      pozivnice.forEach(element => {
        if (element.brojPasosa == this.currentUser.brojPasosa) {
          this.pozivnice.push(new Pozivnica(element.idLeta, element.idSedista, element.ime, element.prezime, element.brojPasosa, element.rezervisano, element.cenaSedista, element.pozvaoUsername));
          this.idLetova.push({ idLeta: element.idLeta, pozvaoUsername: element.pozvaoUsername, idPozivnice: element.id, idSedista: element.idSedista });
        }
      })
    });
  }

  prikaziPozivnice() {
    this.letData = new Array<Array<string>>();
    this.service.getLetovi().subscribe(letovi => {
      letovi.forEach(element => {
        this.idLetova.forEach(par => {
          if (par.idLeta == element.id) {
            this.empty = 1;
            let temp = new Array<string>();
            temp.push(element.aviokompanija);
            temp.push(element.mestoPolaska);
            temp.push(element.mestoDolaska);
            temp.push(element.datumPolaska);
            temp.push(element.datumDolaska);
            temp.push(element.vremePoletanja);
            temp.push(element.vremeSletanja);
            temp.push(element.cenaKarte.toString());
            temp.push(par.pozvaoUsername);
            temp.push(element.id.toString())
            temp.push(par.idPozivnice.toString());
            this.letData.push(temp);
          }
        })
      })
    });
  }

  PrihvatiPozivnicu(idLeta: number, idPozivnice: number) {    
    this.idLetova.forEach(element => {
      if (element.idPozivnice == idPozivnice) {
        var idSedista = element.idSedista.replace(" ", "-");
        this.service.deleteSediste(idLeta, idSedista).subscribe(sediste => {
          this.service.rezervisiSediste(new Sediste(sediste.idLeta, sediste.idSedista, sediste.ime, sediste.prezime, sediste.brojPasosa, true, sediste.cenaSedista)).subscribe();
        }); 
        
      }
    })
    this.service.deletePozivnicu(idPozivnice).subscribe();
    this.router.navigateByUrl('/pocetna');
    this.toastr.success("Uspesno ste prihvatili pozivnicu!");
  }

  OdbijPozivnicu(idLeta: number, idPozivnice: number) {
    this.idLetova.forEach(element => {
      if (element.idPozivnice == idPozivnice) {
        var idSedista = element.idSedista.replace(" ", "-");
        this.service.deleteSediste(idLeta, idSedista).subscribe();
      }
    })
    this.service.deletePozivnicu(idPozivnice).subscribe();
    this.router.navigateByUrl('/pocetna');
    this.toastr.success("Uspesno ste odbili pozivnicu!");
  }

  onBack() {
    this.router.navigateByUrl('/pocetna');
  }
}
