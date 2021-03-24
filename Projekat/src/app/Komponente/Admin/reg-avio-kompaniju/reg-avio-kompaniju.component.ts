import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location} from '@angular/common';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LetoviService } from '../../../shared/letovi.service';
import { AvioAdminService } from '../../../shared/avio-admin.service';
import { AvioKompanija } from '../../../entities/objects/avio-kompanija';

@Component({
  selector: 'app-reg-avio-kompaniju',
  templateUrl: './reg-avio-kompaniju.component.html'
})
export class RegAvioKompanijuComponent implements OnInit {
  avioAdminFormModel: FormGroup;
  naziv: string;
  grad: string;
  drzava: string;
  adresa: string;
  opis: string;
  avioKompanija: AvioKompanija;
  
  constructor(private location: Location, public service: AvioAdminService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.avioAdminFormModel = new FormGroup({
      'naziv': new FormControl('', Validators.required),
      'grad': new FormControl('', Validators.required),
      'drzava': new FormControl('', Validators.required),
      'adresa': new FormControl('', Validators.required),
      'opis': new FormControl('', Validators.required)
    });
  }

  async onSubmit() {
    this.naziv = this.avioAdminFormModel.get('naziv').value;
    this.grad = this.avioAdminFormModel.get('grad').value;
    this.adresa = this.avioAdminFormModel.get('adresa').value;
    this.opis = this.avioAdminFormModel.get('opis').value;
    this.drzava = this.avioAdminFormModel.get('drzava').value;

    var res = await this.service.addAvioKompanija(this.naziv, this.adresa, this.grad, this.drzava, this.opis);
    if(res != null){
      this.toastr.success('Uspesno ste registrovali aviokompaniju');
      this.router.navigate(['/pocetna'])
    }
    else{
      this.toastr.error('Doslo je do greske')
    }
  }

  onBack()
  {
    this.location.back();
  }

}
