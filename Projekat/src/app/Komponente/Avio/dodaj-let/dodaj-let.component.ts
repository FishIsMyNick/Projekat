import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Let } from '../../../entities/objects/let';
import { LetoviService } from '../../../shared/letovi.service';
import { element } from 'protractor';
import { Aerodrom } from '../../../entities/objects/aerodrom';
import { AppComponent } from '../../../app.component';
import { ToastrService } from 'ngx-toastr';
import { DestinacijeService } from '../../../shared/destinacije.service';
import { Presedanje } from '../../../entities/objects/presedanje';

@Component({
  selector: 'app-dodaj-let',
  templateUrl: './dodaj-let.component.html'
})
export class DodajLetComponent implements OnInit {
  letPodaciForm: FormGroup;
  presedanjaForm: FormGroup;
  tip: String;
  empty: number;
  let: Let;
  dugme: boolean;
  polaznaDestinacija: string;
  odredisnaDestinacija: string;
  datumPoletanja: string;
  vremePoletanja: string;
  datumSletanja: string;
  vremeSletanja: string;
  vremePutovanja: string;
  duzinaPutovanja: number;
  klasa: string;
  tipLeta: string;
  lokacije: string;
  lokacijePresedanja: Array<string>;
  cenaKarte: number;
  moguceDestinacije: Array<string>;
  grad: string;
  drzava: string;
  aerodrom: Aerodrom;

  presedanjaData: Array<string>;
  presedanjaDataFilter: Array<string>;
  listaPresedanja: Array<Presedanje>;


  constructor(private location: Location, private formBuilder: FormBuilder, private service: LetoviService, private toastr: ToastrService, private serviceD: DestinacijeService) {
    this.empty = 0;
    this.dugme = false;
    this.moguceDestinacije = new Array<string>();
    this.presedanjaData = new Array<string>();
  }

  ngOnInit(): void {
    this.ucitajMoguceDestinacije();
    this.initForm();
  }

  initForm(){
    this.letPodaciForm = new FormGroup({
      'polaznaDestinacija': new FormControl('', Validators.required),
      'odredisnaDestinacija': new FormControl('', Validators.required),
      'datumPoletanja': new FormControl('', Validators.required),
      'vremePoletanja': new FormControl('', Validators.required),
      'datumSletanja': new FormControl('', Validators.required),
      'vremeSletanja': new FormControl('', Validators.required),
      'vremePutovanja': new FormControl('', Validators.required),
      'duzinaPutovanja': new FormControl('', Validators.required),
      'klasa': new FormControl('', Validators.required),
      'tipLeta': new FormControl('', Validators.required),
      'cenaKarte': new FormControl('', Validators.required)
    });

    this.letPodaciForm.controls['klasa'].setValue('economy');
    this.letPodaciForm.controls['tipLeta'].setValue('oneWay');

  }

  PolaznaChanged(e) {}
  OdredisnaChanged(e) {}


  ucitajMoguceDestinacije() {
    this.serviceD.getAerodromi().subscribe(destinacije => {
      destinacije.forEach(element => {
        if (element.aviokompanija == AppComponent.avioKompanija.naziv) {
          this.moguceDestinacije.push(element.grad);
          this.presedanjaData.push(element.grad + ',' + element.drzava);
        }        
      })
    });

    this.presedanjaForm = this.formBuilder.group({
      presedanja: new FormArray([])
    });
  }

  radioButton(e: string): void {
    this.tip = e;
    if (this.tip == 'multiCity') {
      this.empty = 1;
    }
    else {
      this.empty = 0;
    }
  }  

  onSubmit() {
    this.lokacijePresedanja = new Array<string>();
    this.listaPresedanja = new Array<Presedanje>();

    this.polaznaDestinacija = this.letPodaciForm.get('polaznaDestinacija').value;
    this.odredisnaDestinacija = this.letPodaciForm.get('odredisnaDestinacija').value;
    this.datumPoletanja = this.letPodaciForm.get('datumPoletanja').value;
    this.vremePoletanja = this.letPodaciForm.get('vremePoletanja').value;
    this.datumSletanja = this.letPodaciForm.get('datumSletanja').value;
    this.vremeSletanja = this.letPodaciForm.get('vremeSletanja').value;
    this.vremePutovanja = this.letPodaciForm.get('vremePutovanja').value;
    this.duzinaPutovanja = this.letPodaciForm.get('duzinaPutovanja').value;
    this.klasa = this.letPodaciForm.get('klasa').value;
    this.tipLeta = this.letPodaciForm.get('tipLeta').value;
    this.lokacijePresedanja = this.presedanjaForm.get('presedanja').value;
    this.cenaKarte = this.letPodaciForm.get('cenaKarte').value;

    this.lokacijePresedanja.forEach(element => {
      var lok = element.split(",");
      this.listaPresedanja.push(new Presedanje(lok[0], lok[1]));
    })

    
    this.let = new Let(AppComponent.avioKompanija.naziv, this.polaznaDestinacija, this.odredisnaDestinacija, this.datumPoletanja, this.vremePoletanja, this.datumSletanja, this.vremeSletanja, this.vremePutovanja, this.duzinaPutovanja, this.klasa, this.tipLeta, this.listaPresedanja, this.cenaKarte);
    this.service.addLet(this.let).subscribe();
    this.toastr.success('Uspesno ste dodali let!');
    this.dugme = true;
    //this.location.back();
  }

  onPresedanjaChange(e) {
    const presedanja: FormArray = this.presedanjaForm.get('presedanja') as FormArray;
    if (e.target.checked) {
      if (!presedanja.value.includes(e.target.value)) {
        presedanja.push(new FormControl(e.target.value));
      }
    }
    else {
      const index = presedanja.controls.findIndex(x => x.value === e.target.value);
      presedanja.removeAt(index);
    }


  }

  onBack(){
    this.location.back();
  }

}
