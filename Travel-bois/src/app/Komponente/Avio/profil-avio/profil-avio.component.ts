import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-profil-avio',
  templateUrl: './profil-avio.component.html',
  styleUrls: ['./profil-avio.component.css']
})
export class ProfilAvioComponent implements OnInit {
  avioPodaciForm: FormGroup;

  constructor(private location: Location) { 
  }

  ngOnInit(): void {
    
    this.initForm();
  }

  initForm(){
    this.avioPodaciForm = new FormGroup({
      'ime': new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]),
      'prezime': new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      'grad': new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]),
      'brojTelefona': new FormControl('', Validators.required),
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'naziv' : new FormControl('', Validators.required),
      'adresa' : new FormControl('', Validators.required),
      'opis' : new FormControl('', Validators.required),

    });
  }

  onSubmit(){
    console.log(this.avioPodaciForm.value);
    console.log(this.avioPodaciForm);
  }

  onBack()
  {
    this.location.back();
  }

}