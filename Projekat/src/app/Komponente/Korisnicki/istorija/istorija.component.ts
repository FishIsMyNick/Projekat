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
import { RentService } from 'src/app/shared/rent.service';
import { Kola } from '../../../entities/objects/kola';

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
  kolaHeaders = ['Rent-A-Car', 'Marka', 'Model', 'Godiste', 'Broj mesta', 'Tip', 'Rezervisan od', 'Rezervisan do', 'Prosecna ocena'];
  kolaData: any;
  currentUser: RegisteredUser;
  relacija: string;
  ocenjivanje: boolean = false;
  ocena: any;
  kolaZaOceniti: string;
  rentaKolaZaOceniti: string;
  rentaZaOceniti: string;


  avioRezervacije: Array<Let>;
  avioIstorija: Array<Let>;
  idLetLista: Array<number>;
  avioSediste: Array<{ idLeta: number, idSedista: string, cenaSedista: number }>;
  listaSedista: Array<string>;  //za otkazivanje
  listaLetova: Array<number>;  //za otkazivanje


  constructor(private router: Router, private service: LetoviService, private rentService: RentService, private toastr: ToastrService) {}

  async ngOnInit() {
    this.currentUser = AppComponent.currentUser as RegisteredUser;
    this.letData = new Array<Array<string>>();
    this.letDataRez = new Array<Array<string>>();
    this.kolaData = new Array<any>();
    this.emptyIL = 0;
    this.emptyRL = 0;
    this.ocenjivanje = false;

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


    // Ucitavanje rezervacija rente
    var rezervacije = await this.rentService.GetReservations(this.currentUser.userName);

    for (let element of rezervacije) {
      var kola = await this.rentService.GetKola(element.kola, element.renta)

        let data = kola;
      data.renta = element.renta;
      data.marka = element.kola.split('-')[0];
      data.model = element.kola.split('-')[1];
      data.godiste = kola.godiste;
      data.brojMesta = kola.brojMesta;
      data.tip = kola.tipVozila;
      data.prosecnaOcena = await this.rentService.ProsecnaOcenaKola(kola);
      let datOd = new Date(element.od);
      data.od = datOd;
      data.odDan = datOd.getDate();
      data.odMon = datOd.getMonth() + 1;
      data.odYr = datOd.getFullYear();
      let datDo = new Date(element.do);
      data.do = datDo;
      data.doDan = datDo.getDate();
      data.doMon = datDo.getMonth() + 1;
      data.doYr = datDo.getFullYear();
      this.kolaData.push(data);
      data.rezID = element.id;
    }
    //UCITAVANJE LETOVA
    this.UcitajLetove();
  }
 

  OceniLet(i: number) {
    this.relacija = this.avioIstorija[i].mestoPolaska + '-' + this.avioIstorija[i].mestoDolaska;
    var id = this.idLetLista[i];
    this.router.navigateByUrl('/oceniLet/' + id + '/' + this.relacija);
  }
  async OtkaziRezervaciju(id){
    let today = new Date();
    today.setDate(today.getDate() + 2);
    let data = id.split('+');
    let d = new Date(data[1]);
    if(today > d){
      this.toastr.error('Ne mozete otkazati rezervaciju manje od 2 dana do rezervacije!');
    }
    else{
      await this.rentService.DeleteReservation(data[0]);
      this.toastr.success('Uspesno ste otkazali rezervaciju!');
      this.ngOnInit();
    }
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
  OceniKola(event) {
    let arg = event.srcElement.attributes[1].value.split('+');
    this.kolaZaOceniti = arg[0];
    this.rentaKolaZaOceniti = arg[1]
    let dat = new Date(arg[2]);
    let today = new Date();
    if(dat<today){
      this.ocenjivanje = true;
    }
    else{
      this.toastr.error('Rezervacija jos nije ispunjena. Ne mozete jos oceniti!')
    }

  }
  ocenaChanged(value) {
    this.ocena = value;
  }
  async PosaljiOcenu() {
    var kola = await this.rentService.GetKola(this.kolaZaOceniti, this.rentaKolaZaOceniti);
    var uspeo = await this.rentService.OceniKola(kola.naziv, kola.nazivRente, this.ocena.toString(), this.currentUser.userName);
    if (uspeo) {
      this.toastr.success('Uspesno ste ocenili kola');
      this.router.navigate(['/pocetna']);
    }
    else {
      this.toastr.error('Vec ste ocenili ova kola');
    }
  }
  onBack() {
    this.router.navigateByUrl('/pocetna');
  }
  Nazad() {
    this.ngOnInit();
    this.ocenjivanje = false;
  }


  UcitajLetove(){
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
}
