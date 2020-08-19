import { Component, OnInit, Input } from '@angular/core';
import { Let } from '../../../entities/objects/let';
import { Location } from '@angular/common';
import { AppComponent } from '../../../app.component';
import { element } from 'protractor';
import { AvioKompanija } from '../../../entities/objects/avio-kompanija';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Aerodrom } from '../../../entities/objects/aerodrom';
import { Klase } from '../../../_enums';
import { User } from '../../../entities/users/user/user';
import { LetoviService } from '../../../shared/letovi.service';

@Component({
  selector: 'app-letovi',
  templateUrl: './letovi.component.html'
})
export class LetoviComponent implements OnInit {
  letHeaders = ['Mesto polaska', 'Mesto dolaska', 'Datum polaska', 'Datum dolaska', 'Vreme poletanja', 'Vreme sletanja',  'Klasa', 'Tip puta', 'Cena'];
  FilterForm: FormGroup;
  empty: number;
  destOd: string;
  destDo: string;
  datPolaska: string;
  datDolaska: string;
  k: string;
  klasa: string;
  tipPuta: string;
  t: string;
  aviokompanija: string;
  filtriraniLetovi: Array<Let>;
  ctUser: User;
  currentUser: string;

  letovi: Array<Let>;
  idLetova: Array<number>;

  constructor(private location: Location, private route: ActivatedRoute, private router: Router, private service: LetoviService) {
    this.empty = 0;

    this.ctUser = AppComponent.currentUser;
   }

  ngOnInit() {
    this.currentUser = this.ctUser.constructor.name;
    this.aviokompanija = this.route.snapshot.paramMap.get("naziv");
    this.initForm();
    this.ucitajLetove();
  }

  initForm() {
    this.FilterForm = new FormGroup({
      'destOd' : new FormControl(''),
      'destDo': new FormControl(''),
      'datPolaska': new FormControl(''),
      'datDolaska': new FormControl(''),
      'klasa': new FormControl(''),
      'tipPuta': new FormControl('')
    });
  }

  filterReset() {
    this.FilterForm.controls['destOd'].setValue('');
    this.FilterForm.controls['destDo'].setValue('');
    this.FilterForm.controls['klasa'].setValue('');
    this.FilterForm.controls['tipPuta'].setValue('');
    this.FilterForm.controls['datPolaska'].setValue('');
    this.FilterForm.controls['datDolaska'].setValue('');

    this.empty = 1;
  }

  onSubmit() {
    this.destOd = this.FilterForm.get('destOd').value;
    this.destDo = this.FilterForm.get('destDo').value;
    this.k = this.FilterForm.get('klasa').value;
    if (this.k != "") {
      if (this.k == 'first') {
        this.klasa = '0';
      }
      else if (this.k == 'economy') {
        this.klasa = '1';
      }
      else {
        this.klasa = '2';
      }
    }
    else {
      this.klasa = '';
    }
    this.t = this.FilterForm.get('tipPuta').value;
    if (this.t != "") {
      if (this.t == 'one-way') {
        this.tipPuta = '0';
      }
      else {
        this.tipPuta = '1';
      }
    }
    else {
      this.tipPuta = '';
    }
    this.datPolaska = this.FilterForm.get('datPolaska').value;
    this.datDolaska = this.FilterForm.get('datDolaska').value;

   
    //////filtriranje

    if (this.destOd != "") {
      if (this.destDo != "") {
        if (this.klasa != "") {
          if (this.tipPuta != "") {
            if (this.datPolaska != "") {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.mestoDolaska == this.destDo && l.klasaLeta.toString() == this.klasa && l.tipLeta.toString() == this.tipPuta && l.datumPolaska == this.datPolaska && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.mestoDolaska == this.destDo && l.klasaLeta.toString() == this.klasa && l.tipLeta.toString() == this.tipPuta && l.datumPolaska == this.datPolaska);
              }
            }
            else { //nemam datum polaska
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.mestoDolaska == this.destDo && l.klasaLeta.toString() == this.klasa && l.tipLeta.toString() == this.tipPuta && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.mestoDolaska == this.destDo && l.klasaLeta.toString() == this.klasa && l.tipLeta.toString() == this.tipPuta);
              }
            }
          }
          else {  //nemam tip
            if (this.datPolaska != "") {  //nemam tip 
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.mestoDolaska == this.destDo && l.klasaLeta.toString() == this.klasa && l.datumPolaska == this.datPolaska && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.mestoDolaska == this.destDo && l.klasaLeta.toString() == this.klasa && l.datumPolaska == this.datPolaska);
              }
            }
            else {  //nemam tip ni datum polaska
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.mestoDolaska == this.destDo && l.klasaLeta.toString() == this.klasa && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.mestoDolaska == this.destDo && l.klasaLeta.toString() == this.klasa);
              }
            }
          }
        }
        else { //nemam klasu
          if (this.tipPuta != "") { // nemam klasu al imamtip puta
            if (this.datPolaska != "") {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.mestoDolaska == this.destDo && l.tipLeta.toString() == this.tipPuta && l.datumPolaska == this.datPolaska && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.mestoDolaska == this.destDo && l.tipLeta.toString() == this.tipPuta && l.datumPolaska == this.datPolaska);
              }

            }
            else { // nemam ni datum polaska
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.mestoDolaska == this.destDo && l.tipLeta.toString() == this.tipPuta && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.mestoDolaska == this.destDo && l.tipLeta.toString() == this.tipPuta);
              }
            }
          }
          else { //nemam klasu ni tip puta
            if (this.datPolaska != "") {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.mestoDolaska == this.destDo && l.datumPolaska == this.datPolaska && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.mestoDolaska == this.destDo && l.datumPolaska == this.datPolaska);
              }
            }
            else {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.mestoDolaska == this.destDo && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.mestoDolaska == this.destDo);
              }
            }
          }
        }
      }
      else {  //nemam destinaciju dolaska
        if (this.klasa != "") {
          if (this.tipPuta != "") {
            if (this.datPolaska != "") {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.klasaLeta.toString() == this.klasa && l.tipLeta.toString() == this.tipPuta && l.datumPolaska == this.datPolaska && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.klasaLeta.toString() == this.klasa && l.tipLeta.toString() == this.tipPuta && l.datumPolaska == this.datPolaska);
              }
            }
            else {//nemam destinaciju dolaska, i nemam datum polaska
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.klasaLeta.toString() == this.klasa && l.tipLeta.toString() == this.tipPuta && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.klasaLeta.toString() == this.klasa && l.tipLeta.toString() == this.tipPuta);
              }
            }
          }
          else {  //nemam dest dolaska, nemam tip
            if (this.datPolaska != "") {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.klasaLeta.toString() == this.klasa &&  l.datumPolaska == this.datPolaska && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.klasaLeta.toString() == this.klasa  && l.datumPolaska == this.datPolaska );
              }
            }
            else {//nemam dest dolaska, tip ni datum polaska
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd  && l.klasaLeta.toString() == this.klasa   && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd  && l.klasaLeta.toString() == this.klasa );
              }
            }
          }
        }
        else {//nemam des dolazaka ni klasu
          if (this.tipPuta != "") {
            if (this.datPolaska != "") {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd  && l.tipLeta.toString() == this.tipPuta && l.datumPolaska == this.datPolaska && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd &&  l.tipLeta.toString() == this.tipPuta && l.datumPolaska == this.datPolaska );
              }
            }
            else { //nema des dolazka, ni klasu, ni datum polaska
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd   && l.tipLeta.toString() == this.tipPuta  && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd   && l.tipLeta.toString() == this.tipPuta );
              }
            }
          }
          else { //nemam dest dolazaka, klasu ni tip
            if (this.datPolaska != "") {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd  && l.datumPolaska == this.datPolaska && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd && l.datumPolaska == this.datPolaska );
              }
            }
            else {//nemam dest dolazaka, klasu, tip i datum polazaka
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd   && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoPolaska == this.destOd);
              }
            }
          }
        }
      }
    }
    else {  //nemam destinaciju polazaka
      if (this.destDo != "") {
        if (this.klasa != "") {
          if (this.tipPuta != "") {
            if (this.datPolaska != "") {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoDolaska == this.destDo && l.klasaLeta.toString() == this.klasa && l.tipLeta.toString() == this.tipPuta && l.datumPolaska == this.datPolaska && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoDolaska == this.destDo && l.klasaLeta.toString() == this.klasa && l.tipLeta.toString() == this.tipPuta && l.datumPolaska == this.datPolaska);
              }
            }
            else {//nemam dest polazaka ni datum polazata
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoDolaska == this.destDo && l.klasaLeta.toString() == this.klasa && l.tipLeta.toString() == this.tipPuta && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoDolaska == this.destDo && l.klasaLeta.toString() == this.klasa && l.tipLeta.toString() == this.tipPuta);
              }
            }
          }
          else {  //nemam dest polazaka ni tip
            if (this.datPolaska != "") {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoDolaska == this.destDo && l.klasaLeta.toString() == this.klasa && l.datumPolaska == this.datPolaska && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoDolaska == this.destDo && l.klasaLeta.toString() == this.klasa && l.datumPolaska == this.datPolaska);
              }
            }
            else {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoDolaska == this.destDo && l.klasaLeta.toString() == this.klasa && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoDolaska == this.destDo && l.klasaLeta.toString() == this.klasa);
              }
            }
          }
        }
        else {//nemam dest polazaka ni klasu
          if (this.tipPuta != "") {
            if (this.datPolaska != "") {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoDolaska == this.destDo && l.tipLeta.toString() == this.tipPuta && l.datumPolaska == this.datPolaska && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoDolaska == this.destDo && l.tipLeta.toString() == this.tipPuta && l.datumPolaska == this.datPolaska);
              }
            }
            else { // nemam dest polazaka, klasu ni datum polaska
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoDolaska == this.destDo && l.tipLeta.toString() == this.tipPuta && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoDolaska == this.destDo && l.tipLeta.toString() == this.tipPuta);
              }
            }
          }
          else {//nemam dest polazaka ni klasu ni tip
            if (this.datPolaska != "") {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoDolaska == this.destDo && l.datumPolaska == this.datPolaska && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoDolaska == this.destDo && l.datumPolaska == this.datPolaska);
              }
            }
            else {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoDolaska == this.destDo && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.mestoDolaska == this.destDo);
              }
            }
          }
        }
      }
      else {  //nemam dest polazaka ni dolazaka
        if (this.klasa != "") {
          if (this.tipPuta != "") {
            if (this.datPolaska != "") {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.klasaLeta.toString() == this.klasa && l.tipLeta.toString() == this.tipPuta && l.datumPolaska == this.datPolaska && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.klasaLeta.toString() == this.klasa && l.tipLeta.toString() == this.tipPuta && l.datumPolaska == this.datPolaska);
              }
            }
            else {//nemam dest polazaka ni dolazaka ni datum polaska
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l =>  l.klasaLeta.toString() == this.klasa && l.tipLeta.toString() == this.tipPuta && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.klasaLeta.toString() == this.klasa && l.tipLeta.toString() == this.tipPuta );}
            }
          }
          else {//nemam dest polazaka ni dolazaka ni puta
            if (this.datPolaska != "") {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.klasaLeta.toString() == this.klasa && l.datumPolaska == this.datPolaska && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.klasaLeta.toString() == this.klasa && l.datumPolaska == this.datPolaska);
              }
            }
            else {//nemam dest polazaka ni dolazaka ni puta ni datum polazaka
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l =>  l.klasaLeta.toString() == this.klasa  &&  l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.klasaLeta.toString() == this.klasa );
              }
            }
          }
        }
        else {//nemam dest polazaka ni dolazaka ni klasu
          if (this.tipPuta != "") {
            if (this.datPolaska != "") {
              if (this.datDolaska != "")
              {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l =>  l.tipLeta.toString() == this.tipPuta && l.datumPolaska == this.datPolaska && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.tipLeta.toString() == this.tipPuta && l.datumPolaska == this.datPolaska );
              }
            }
            else {//nemam dest polazaka ni dolazaka ni klasu ni datum polazaka
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l =>  l.tipLeta.toString() == this.tipPuta && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.tipLeta.toString() == this.tipPuta );
              }
            }
          }
          else {//nemam dest polazaka ni dolazaka ni klasu ni tip puta
            if (this.datPolaska != "") {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l =>  l.datumPolaska == this.datPolaska && l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.datumPolaska == this.datPolaska );
              }
            }
            else {
              if (this.datDolaska != "") {
                this.filtriraniLetovi = Array<Let>();
                this.filtriraniLetovi = this.letovi.filter(l => l.datumDolaska == this.datDolaska);
              }
              else {
                this.filtriraniLetovi = Array<Let>();
              }
            }
          }
        }
      }
    }

    if (this.filtriraniLetovi.length != 0) {
      this.empty = 2;
    }
    else {
      if (this.destDo == "" && this.destOd == "" && this.klasa == "" && this.tipPuta == "" && this.datDolaska == "" && this.datPolaska == "") {
        this.empty = 1;
      }
      else {
        this.empty = 3;
      }
      
    }

    
  }

  KlasaChanged(e) {
    //this.k = this.FilterForm.get('klasa').value;
  }

  TipPutaChanged(e) {

    //this.t = this.FilterForm.get('tipPuta').value;
  }

  ucitajLetove() {
    this.letovi = new Array<Let>();
    this.idLetova = new Array<number>();
    this.service.getLetovi().subscribe(letovi => {
      letovi.forEach(element => {
        if (element.aviokompanija == this.aviokompanija) {
          var datum = element.datumPolaska.split("-");
          var danasnji = new Date().toString();
          var danasnjiDatum = danasnji.split(" ");
          var trenutnaGod = new Date().getFullYear();
          var trenutniMes = new Date().getMonth();
          var trenutniDan = danasnjiDatum[2];
          //var vreme = danasnjiDatum[4].split(":");
          //console.log(vreme);

          if (parseInt(datum[0]) >= trenutnaGod) {
            if (parseInt(datum[1]) >= (trenutniMes + 1)) {
              if (parseInt(datum[1]) == (trenutniMes + 1)) {  //bas trenutni mesec
                if (parseInt(datum[2]) > parseInt(trenutniDan)) { //nema mogucnost prikaza letova koji polecu na danasnji dan
                  this.empty = 1;
                  this.letovi.push(new Let(element.aviokompanija, element.mestoPolaska, element.mestoDolaska, element.datumPolaska, element.vremePoletanja,
                    element.datumDolaska, element.vremeSletanja, element.trajanjePutovanja, element.razdaljinaPutovanja, element.klasaLeta, element.tipLeta,
                    element.presedanjaLeta, element.cenaKarte));
                  this.idLetova.push(element.id);
                }               
              }
              else {
                this.empty = 1;
                this.letovi.push(new Let(element.aviokompanija, element.mestoPolaska, element.mestoDolaska, element.datumPolaska, element.vremePoletanja,
                  element.datumDolaska, element.vremeSletanja, element.trajanjePutovanja, element.razdaljinaPutovanja, element.klasaLeta, element.tipLeta,
                  element.presedanjaLeta, element.cenaKarte));
                this.idLetova.push(element.id);
              }      
            }            
          }                   
        }
      })
    });


  }

  RezervisiLet(i: number) {
    var id = this.idLetova[i];
    this.router.navigateByUrl('/rezervacija/' + this.aviokompanija + '/' + id);
  }

  onBack() {
    this.location.back();
  }

}
