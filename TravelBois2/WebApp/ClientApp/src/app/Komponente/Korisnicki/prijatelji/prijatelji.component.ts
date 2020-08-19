import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RegisteredUser } from '../../../entities/users/registered-user/registered-user';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/user.service';
import { User } from '../../../entities/users/user/user';
import { AppComponent } from '../../../app.component';
import { Prijatelj } from '../../../entities/objects/prijatelj';
import { ToastrService } from 'ngx-toastr';
import { PrihvacenPrijatelj } from '../../../entities/objects/prihvacen-prijatelj';

@Component({
  selector: 'app-prijatelji',
  templateUrl: './prijatelji.component.html'
})
export class PrijateljiComponent implements OnInit {
  prijateljPodaciForm: FormGroup;
  SortForm: FormGroup;
  kriterijum: string;
  empty: number;
  empty1: number;
  empty2: number;
  empty3: number;
  mojiPrijatelji: Array<RegisteredUser>;
  prijatelji: Array<any>;  //lista samo za prikaz, ne ucitava se iz baze
  korisnici: Array<any>;
  korisniciP: Array<any>;
  zahtevi: Array<string>;
  listaPrijatelja: Array<string>;
  idZahteva: Array<{ id: number, username: string }>;
  idPrijatelja: Array<{ id: number, username: string }>;
  zahteviZaPrijatelja: Array<RegisteredUser>;
  ime: string;
  prezime: string;
  poruka: string;
  currentUser: RegisteredUser;
  prijatelj: Prijatelj;
  prihvacenPrijatelj: PrihvacenPrijatelj;

  constructor(private router: Router, public fb: FormBuilder, private service: UserService, private toastr: ToastrService) {
    this.empty = 0;
    this.empty1 = 0;
    this.empty2 = 0;
    this.empty3 = 0;

    this.SortForm = this.fb.group({
      selectedKriterijum: ['']
    });
  }

  ngOnInit(): void {
    this.currentUser = AppComponent.currentUser as RegisteredUser;
    this.zahteviZaPrijatelja = new Array<RegisteredUser>();
    this.idZahteva = new Array<{ id: number, username: string}>();
    this.idPrijatelja = new Array<{ id: number, username: string}>();
    this.initForm();

    this.ucitajKorisnike();
    this.ucitajKorisnikeP();
    this.ucitajZahteve();
    this.ucitajPrijatelje();    
  }

  initForm() {
    this.prijateljPodaciForm = new FormGroup({
      'ime': new FormControl(''),
      'prezime': new FormControl('')
    });
  }

  KriterijumChanged(e) {
    this.kriterijum = this.SortForm.get('selectedKriterijum').value;
    this.sortiraj(this.kriterijum);
  }

  sortiraj(kriterijum: string) {
    if (kriterijum == 'ime') {
      this.mojiPrijatelji.sort((a, b) => a.Ime.localeCompare(b.Ime));
    }
    else if (kriterijum == 'prezime') {
      this.mojiPrijatelji.sort((a, b) => a.Prezime.localeCompare(b.Prezime));
    }
  }

  onSubmit() {
    this.prijatelji = new Array<any>();

    if (this.prijateljPodaciForm.get('ime').value !== "") {
      this.ime = this.prijateljPodaciForm.get('ime').value;
    }
    else {
      this.ime = "";
    }

    if (this.prijateljPodaciForm.get('prezime').value !== "") {
      this.prezime = this.prijateljPodaciForm.get('prezime').value;
    }
    else {
      this.prezime = "";
    }

    ///////////////////////////////////////////////
    if (this.ime !== "" && this.prezime !== "") {
      this.korisnici.forEach(element => {
        if (element.tipKorisnika == "RegularUser") {        
          if (element.name == this.ime) {
            if (element.lastname == this.prezime) {
              if (element.userName != this.currentUser.Username) {
                if (this.zahtevi.some(x => x === element.userName)) {
                  this.empty3 = 1;                
                }
                else if (this.listaPrijatelja.some(x => x === element.userName)) {
                  this.empty3 = 2;
                }
                else {
                  this.prijatelji.push(element);
                  this.empty2 = 1;
                }
              }            
            }
          }
        }
      });
      if (this.prijatelji.length == 0) {
        this.empty2 = 2;
        if (this.empty3 == 1) { this.poruka = "Ovaj korisnik vam je poslao zahtev!"; }
        else if (this.empty3 == 2) { this.poruka = "Ovaj korisnik vam je vec prijatelj!" }
        else { this.poruka = "Nema korisnika sa tim imenom i prezimenom!"; }     
        
      }
    }
    else if (this.ime !== "" && this.prezime == "") {
      this.korisnici.forEach(element => {
        if (element.tipKorisnika == "RegularUser") {
          if (element.name == this.ime) {
            if (element.userName != this.currentUser.Username) {
              if (this.zahtevi.some(x => x === element.userName)) {
                this.empty3 = 1;
              }
              else if (this.listaPrijatelja.some(x => x === element.userName)) {
                this.empty3 = 2;
              }
              else {
                this.prijatelji.push(element);
                this.empty2 = 1;
              }
            }
          }
        }
      });
      if (this.prijatelji.length == 0) {
        this.empty2 = 2;
        if (this.empty3 == 1) { this.poruka = "Korisnik sa tim imenom vam je poslao zahtev!"; }
        else { this.poruka = "Nema korisnika sa tim imenom!";}
        
      }
    }
    else if (this.ime == "" && this.prezime !== "") {
      this.korisnici.forEach(element => {
        if (element.tipKorisnika == "RegularUser") {
          if (element.lastname == this.prezime) {
            if (element.userName != this.currentUser.Username) {
              if (this.zahtevi.some(x => x === element.userName)) {
                this.empty3 = 1;
              }
              else if (this.listaPrijatelja.some(x => x === element.userName)) {
                this.empty3 = 2;
              }
              else {
                this.prijatelji.push(element);
                this.empty2 = 1;
              }
            }
          }
        }
      });
      if (this.prijatelji.length == 0) {
        this.empty2 = 2;
        if (this.empty3 == 1) { this.poruka = "Korisnik sa tim prezimenom vam je poslao zahtev!"; }
        else { this.poruka = "Nema korisnika sa tim prezimenom!";}        
      }
    }
    else if (this.ime == "" && this.prezime=="") {
      this.empty2 = 2;
      this.poruka = "Morate uneti ime i/ili prezime!";      
    }   
  }

  ucitajKorisnike() {
    this.service.getUsers().subscribe(korisnici => this.korisnici = korisnici);
  }

  ucitajKorisnikeP() {
    this.service.getUsers().subscribe(korisnici => this.korisniciP = korisnici);
  }

  ucitajZahteve() {
    this.zahtevi = new Array<string>();
    this.service.getZahtevi().subscribe(zahtevi =>
      zahtevi.forEach(element => {
        if (element.primio == this.currentUser.Username) {
          this.zahtevi.push(element.poslao);
          this.idZahteva.push({ id: element.id, username: element.poslao });
        }
      }));    
  }

  prikaziZahteve() {
    this.zahtevi.forEach(element => {
      this.korisnici.forEach(k => {
        if (k.userName == element) {
          this.zahteviZaPrijatelja.push(new RegisteredUser(k.brojTelefona, k.grad, k.name, k.lastname, k.userName, k.brojPasosa));
        }
      })
    })

    if (this.zahteviZaPrijatelja.length != 0) {
      this.empty1 = 1;
    }
    else {
      this.toastr.error( 'Trenutno nemate zahteve za prijateljstvo.');
    }
  }

  ucitajPrijatelje() {//ucitaj prijatelje trenutnog korisnika
    this.listaPrijatelja = new Array<string>();
    this.service.getPrijatelji().subscribe(prijatelji => {
      prijatelji.forEach(element => {
        if (element.username1 == this.currentUser.Username) {
          this.listaPrijatelja.push(element.username2);
          this.idPrijatelja.push({ id: element.id, username: element.username2 });
        }
        else if (element.username2 == this.currentUser.Username) {
          this.listaPrijatelja.push(element.username1);
          this.idPrijatelja.push({ id: element.id, username: element.username1 });
        }
      })
    });
  }

  prikaziPrijatelje() {
    this.mojiPrijatelji = new Array<RegisteredUser>();
    this.listaPrijatelja.forEach(element => {
      this.korisniciP.forEach(k => {
        if (k.userName == element) {
          this.mojiPrijatelji.push(new RegisteredUser(k.brojTelefona, k.grad, k.name, k.lastname, k.userName, k.brojPasosa));
        }
      })
    })

    if (this.mojiPrijatelji.length != 0) {
      this.empty = 1;
    }
    else {
      this.toastr.error('Trenutno nemate prijatelja.');
    }
  }

  dodajPrijatelja(username: string) {
    this.prijatelj = new Prijatelj(username, this.currentUser.Username);
    this.service.sendZahtev(this.prijatelj).subscribe();
    this.empty2 = 2;
    this.poruka = "Zahtev za prijateljstvo poslat!";

    this.korisnici = this.korisnici.filter(k => k.userName != username);
  }

  ukloniPrijatelja(username: string) {
    this.idPrijatelja.forEach(element => {
      if (element.username == username) {
        this.service.deletePrijatelj(element.id).subscribe();
        this.mojiPrijatelji = this.mojiPrijatelji.filter(f => f.Username != username);
        if (this.mojiPrijatelji.length == 0) {
          this.empty = 0;
          this.toastr.success("Refreshujte stranicu.");
        }
        
      }
    })

    this.ucitajPrijatelje();
  }


  prihvatiPrijatelja(username: string) {
    this.idZahteva.forEach(element => {
      if (element.username == username) {
        this.service.deleteZahtev(element.id).subscribe();
        this.zahteviZaPrijatelja = this.zahteviZaPrijatelja.filter(f => f.Username != username);
        this.empty = 0
        if (this.zahteviZaPrijatelja.length == 0) {
          this.empty1 = 0;
        }
      }
    })

    //////plus dodavanje u listu prijatelja
    this.prihvacenPrijatelj = new PrihvacenPrijatelj(this.currentUser.Username, username);
    this.service.addPrijatelj(this.prihvacenPrijatelj).subscribe();
    this.ucitajZahteve();
    this.ucitajPrijatelje();
    this.prikaziPrijatelje();
  }

  odbijPrijatelja(username: string) {
    this.idZahteva.forEach(element => {
      if (element.username == username) {
        this.service.deleteZahtev(element.id).subscribe();
        this.zahteviZaPrijatelja = this.zahteviZaPrijatelja.filter(f => f.Username != username);
        if (this.zahteviZaPrijatelja.length == 0) {
          this.empty1 = 0;
          this.toastr.success("Refreshujte stranicu.");
        }
      }
    })
    this.ucitajZahteve();
  }

  onBack()
  {
    this.router.navigateByUrl('/pocetna');
  } 

}
