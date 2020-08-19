import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AvioAdmin } from '../../../entities/users/avio-admin/avio-admin';
import { AppComponent } from '../../../app.component';
import { AvioAdminService } from '../../../shared/avio-admin.service';
import { element } from 'protractor';
import { AvioKompanija } from '../../../entities/objects/avio-kompanija';
import { elementAt } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profil-avio',
  templateUrl: './profil-avio.component.html',
  styleUrls: ['./profil-avio.component.css']
})
export class ProfilAvioComponent implements OnInit {
  avioPodaciForm: FormGroup;
  currentUser: AvioAdmin;
  aviokompanija: AvioKompanija;

  constructor(private router: Router, private service: AvioAdminService, private toastr: ToastrService) {
    this.currentUser = <AvioAdmin>AppComponent.currentUser;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.avioPodaciForm = new FormGroup({
      'naziv': new FormControl(AppComponent.avioKompanija.naziv, Validators.required),
      'grad': new FormControl(AppComponent.avioKompanija.grad, Validators.required),
      'adresa': new FormControl(AppComponent.avioKompanija.adresa, Validators.required),
      'opis': new FormControl(AppComponent.avioKompanija.opis, Validators.required),

    });
  }

  onSubmit() {
    if ((this.avioPodaciForm.get('grad').value != AppComponent.avioKompanija.grad) || (this.avioPodaciForm.get('adresa').value != AppComponent.avioKompanija.adresa)
      || (this.avioPodaciForm.get('opis').value != AppComponent.avioKompanija.opis)) {
      this.aviokompanija = new AvioKompanija(AppComponent.avioKompanija.naziv, this.avioPodaciForm.get('adresa').value, this.avioPodaciForm.get('grad').value, this.avioPodaciForm.get('opis').value);
      this.service.updateAviokompanija(this.aviokompanija, AppComponent.avioKompanija.naziv).subscribe();
      this.toastr.success('Uspesno ste izmenili podatke!');
    }
    else {
      this.toastr.error('Morate izmeniti podatke!');
    }
  }

  Map() {
    //window.open('https://localhost:44343/maps', "_self");
    this.router.navigateByUrl('/maps');
  }

  onBack()
  {
    this.router.navigateByUrl('/pocetna');
  }

}
