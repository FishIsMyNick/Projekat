import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { User } from '../../../entities/users/user/user';
import { AppComponent } from '../../../app.component';
import { RegisteredUser } from '../../../entities/users/registered-user/registered-user';
import { TipVozila } from '../../../_enums';
import { Let } from '../../../entities/objects/let';
import { Aerodrom } from '../../../entities/objects/aerodrom';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { LetoviService } from '../../../shared/letovi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-istorija',
  templateUrl: './istorija.component.html'
})
export class IstorijaComponent implements OnInit {
  letHeadersIstorija = ['Aviokompanija','Mesto polaska', 'Mesto dolaska', 'Datum polaska', 'Datum dolaska'];
  letHeadersRezervacija = ['Aviokompanija','Mesto polaska', 'Mesto dolaska', 'Datum polaska', 'Datum dolaska', 'Vreme poletanja', 'Vreme sletanja', 'Klasa', 'Tip puta', 'Cena'];
  letData: Array<Array<string>>;
  letDataRez: Array<Array<string>>;
  emptyIL: number;
  emptyRL: number;
  kolaHeaders = ['Rent-A-Car', 'Marka', 'Model', 'Godiste', 'Broj mesta', 'Tip', 'Prosecna ocena'];
  kolaData: Array<Array<string>>;
  currentUser: RegisteredUser;
  relacija: string;


  avioRezervacije: Array<Let>;
  avioIstorija: Array<Let>;
  idLetLista: Array<number>;
  avioSediste: Array<{ idLeta: number, idSedista: string, cenaSedista: number }>;
  listaSedista: Array<string>;  //za otkazivanje
  listaLetova: Array<number>;  //za otkazivanje


  constructor(private router: Router, private service: LetoviService, private toastr: ToastrService) { 
    this.currentUser = AppComponent.currentUser as RegisteredUser;
    this.letData = new Array<Array<string>>();
    this.letDataRez = new Array<Array<string>>();
    this.kolaData = new Array<Array<string>>();
    this.emptyIL = 0;
    this.emptyRL = 0; 
    
  }

  ngOnInit(): void {
    this.avioSediste = new Array<{ idLeta: number, idSedista: string, cenaSedista: number }>();
    this.service.getSediste().subscribe(sedista => {
      sedista.forEach(element => {
        if (element.brojPasosa == this.currentUser.brojPasosa) {
          if (element.rezervisano) {

            this.avioSediste.push({ idLeta: element.idLeta, idSedista: element.idSedista, cenaSedista: element.cenaSedista });
          }
        }
      })
    });


    this.avioIstorija = new Array<Let>();
    this.avioRezervacije = new Array<Let>();
    this.idLetLista = new Array<number>();
    this.listaSedista = new Array<string>();
    this.listaLetova = new Array<number>();

    //UCITAVANJE LETOVA
    this.service.getLetovi().subscribe(letovi => {
      letovi.forEach(element => {
        this.avioSediste.forEach(s => {
          if (s.idLeta == element.id) {
            var datum = element.datumPolaska.split("-");
            var danasnji = new Date().toString();
            var danasnjiDatum = danasnji.split(" ");
            var trenutnaGod = new Date().getFullYear();
            var trenutniMes = new Date().getMonth();
            var trenutniDan = danasnjiDatum[2];

            if (parseInt(datum[0]) >= trenutnaGod) {
              if (parseInt(datum[1]) >= (trenutniMes + 1)) {
                if (parseInt(datum[1]) == (trenutniMes + 1)) {  //bas trenutni mesec
                  if (parseInt(datum[2]) >= parseInt(trenutniDan)) {
                    ///jos resiti za vreme

                    this.emptyRL = 1;

                    if (element.cenaKarte! = s.cenaSedista) {
                      this.avioRezervacije.push(new Let(element.aviokompanija, element.mestoPolaska, element.mestoDolaska, element.datumPolaska, element.vremePoletanja,
                        element.datumDolaska, element.vremeSletanja, element.trajanjePutovanja, element.razdaljinaPutovanja, element.klasaLeta, element.tipLeta, element.presedanjaLeta, s.cenaSedista));
                    }
                    else {
                      this.avioRezervacije.push(new Let(element.aviokompanija, element.mestoPolaska, element.mestoDolaska, element.datumPolaska, element.vremePoletanja,
                        element.datumDolaska, element.vremeSletanja, element.trajanjePutovanja, element.razdaljinaPutovanja, element.klasaLeta, element.tipLeta, element.presedanjaLeta, element.cenaKarte));
                    }

                    this.idLetLista.push(element.id);
                    this.listaSedista.push(s.idSedista);
                    this.listaLetova.push(s.idLeta);
                  }
                  else { //od juce pa nadalje
                    this.emptyIL = 1;
                    this.avioIstorija.push(new Let(element.aviokompanija, element.mestoPolaska, element.mestoDolaska, element.datumPolaska, element.vremePoletanja,
                      element.datumDolaska, element.vremeSletanja, element.trajanjePutovanja, element.razdaljinaPutovanja, element.klasaLeta, element.tipLeta, element.presedanjaLeta, element.cenaKarte));
                    this.idLetLista.push(element.id);
                  }
                }
                else {
                  this.emptyRL = 1;

                  if (element.cenaKarte != s.cenaSedista) {
                    this.avioRezervacije.push(new Let(element.aviokompanija, element.mestoPolaska, element.mestoDolaska, element.datumPolaska, element.vremePoletanja,
                      element.datumDolaska, element.vremeSletanja, element.trajanjePutovanja, element.razdaljinaPutovanja, element.klasaLeta, element.tipLeta, element.presedanjaLeta, s.cenaSedista));
                  }
                  else {
                    this.avioRezervacije.push(new Let(element.aviokompanija, element.mestoPolaska, element.mestoDolaska, element.datumPolaska, element.vremePoletanja,
                      element.datumDolaska, element.vremeSletanja, element.trajanjePutovanja, element.razdaljinaPutovanja, element.klasaLeta, element.tipLeta, element.presedanjaLeta, element.cenaKarte));
                  }
                  
                  this.idLetLista.push(element.id);
                  this.listaSedista.push(s.idSedista);
                  this.listaLetova.push(s.idLeta);
                }
              }
              else {  //proslog meseca i nadalje
                this.emptyIL = 1;
                this.avioIstorija.push(new Let(element.aviokompanija, element.mestoPolaska, element.mestoDolaska, element.datumPolaska, element.vremePoletanja,
                  element.datumDolaska, element.vremeSletanja, element.trajanjePutovanja, element.razdaljinaPutovanja, element.klasaLeta, element.tipLeta, element.presedanjaLeta, element.cenaKarte));
                this.idLetLista.push(element.id);
              }
            }
            else {  //prosle godine i nadalje
              this.emptyIL = 1;
              this.avioIstorija.push(new Let(element.aviokompanija, element.mestoPolaska, element.mestoDolaska, element.datumPolaska, element.vremePoletanja,
                element.datumDolaska, element.vremeSletanja, element.trajanjePutovanja, element.razdaljinaPutovanja, element.klasaLeta, element.tipLeta, element.presedanjaLeta, element.cenaKarte));
              this.idLetLista.push(element.id);
            }
          }
        })        
      })
    });
  }
 

  OceniLet(i: number) {
    this.relacija = this.avioIstorija[i].mestoPolaska + '-' + this.avioIstorija[i].mestoDolaska;
    var id = this.idLetLista[i];
    this.router.navigateByUrl('/oceniLet/' + id + '/' + this.relacija);
  }

  OtkaziLet(i: number) {
    var idLeta = this.listaLetova[i];
    var idSedista = this.listaSedista[i];

    this.avioRezervacije.splice(i, 1);
    if (this.avioRezervacije.length == 0) {
      this.emptyRL = 0
    }
    this.service.deleteSediste(idLeta, idSedista).subscribe();
    this.toastr.success("Uspesno ste otkazali let!");
  }
  OceniKola() { }
  onBack() {
    this.router.navigateByUrl('/pocetna');
  }  
}
