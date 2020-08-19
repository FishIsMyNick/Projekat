/// <reference path="../../../shared/destinacije.service.ts" />
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DestinacijeService } from '../../../shared/destinacije.service';
import { Aerodrom } from '../../../entities/objects/aerodrom';
import { element } from 'protractor';
import { strict } from 'assert';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-destinacije-avio',
  templateUrl: './destinacije-avio.component.html'

})
export class DestinacijeAvioComponent implements OnInit {
  letHeaders = ['Grad', 'Drzava'];
  destinacijePodaciForm: FormGroup;
  empty: number;
  listaAerodroma: Array<Aerodrom>;
  grad: string;
  drzava: string;
  aerodrom: Aerodrom;
  g: string;
  d: string;
  postoji: boolean;

  constructor(private service: DestinacijeService, private router: Router) {
    this.empty = 0;
    this.postoji = false;
  }

  ngOnInit(): void {
    this.initForm();
    this.getDestinacije();
    
  }


  initForm() {
    this.destinacijePodaciForm = new FormGroup({
      'grad': new FormControl('', Validators.required),
      'drzava': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.grad = this.destinacijePodaciForm.get('grad').value;
    this.drzava = this.destinacijePodaciForm.get('drzava').value;
    this.aerodrom = new Aerodrom(this.grad, this.drzava, AppComponent.avioKompanija.naziv);
    this.service.addDestinacija(this.aerodrom).subscribe();

    this.listaAerodroma.forEach(element => {
      if (element.grad == this.aerodrom.grad) {
        this.postoji = true;
      }
    })

    if (!this.postoji) {
      this.listaAerodroma.push(this.aerodrom);
    }    

    this.initForm();
  }

  

  getDestinacije(): void{
    this.listaAerodroma = new Array<Aerodrom>();
    this.service.getAerodromi().subscribe(aerodromi =>
      aerodromi.forEach(element => {
        if (element.aviokompanija == AppComponent.avioKompanija.naziv) {
          this.empty = 1;
          this.listaAerodroma.push(new Aerodrom(element.grad, element.drzava, element.aviokompanija))
        }
      })
    );    
  }

  ukloniGrad(grad: string) {
    this.service.deleteAerodrom(grad).subscribe();
    this.listaAerodroma = this.listaAerodroma.filter(f => f.grad != grad);
    if (this.listaAerodroma.length == 0) {
      this.empty = 0;
    }
  }

  onBack(){
    this.router.navigateByUrl('/pocetna');
  }

}
