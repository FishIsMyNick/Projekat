import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Location} from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { AnyTxtRecord } from 'dns';
import { HttpClient } from '@angular/common/http';
import { RentService } from 'src/app/shared/rent.service';
import { RentACar } from '../../../entities/objects/rent-a-car';

@Component({
  selector: 'app-reg-renta-kompaniju',
  templateUrl: './reg-renta-kompaniju.component.html'
})
export class RegRentaKompanijuComponent implements OnInit {
  regRentaForm: FormGroup;
  naziv: string;
  adminID: string;
  adresa: string;
  grad: string;
  drzava: string;
  opis: string;
  renta: RentACar;
  submitAttempted: boolean = false;

  public selectedFile: File = null;
  public event1;
  imgURL: string = 'https://wiki.tripwireinteractive.com/images/4/47/Placeholder.png';
  recievedImageData: any;
  base64Data: any;
  convertedImage: any;

  constructor(private location: Location, public service: RentService, private router: Router, private toastr: ToastrService, private httpClient: HttpClient) { }

  /// Slanje podataka /////////////////////////
  onFileChanged(file: FileList){
    console.debug(event);
    this.selectedFile = file.item(0);

    // img preview
    let reader = new FileReader();
    reader.onload = (event:any) => {
      this.imgURL = event.target.result;
    };
    reader.readAsDataURL(file.item(0));
  }
  
  onSubmit(){
    this.submitAttempted = true;
    this.naziv = this.regRentaForm.get('naziv').value;
    this.opis = this.regRentaForm.get('opis').value;
    this.adresa = this.regRentaForm.get('adresa').value;
    this.grad = this.regRentaForm.get('Grad').value;
    this.drzava = this.regRentaForm.get('Drzava').value;
    this.adminID = this.regRentaForm.get('admin').value;

    this.renta = new RentACar(this.naziv, this.adresa);
    this.renta.grad = this.grad;
    this.renta.drzava = this.drzava;
    this.renta.adminID = this.adminID;
    this.renta.opis = this.opis;

    this.service.checkForRentAdmin(this.adminID).subscribe(
      (res: any) => {
        if(res.statusCode == 200) {
          console.log('postoji admin')
          this.service.addRentKompanija(this.renta).subscribe(
            (res: any) =>{
              const uploadData = new FormData();
              uploadData.append('myFile', this.selectedFile);
              uploadData.append(this.naziv, 'filename')

              this.service.addRentImage(uploadData).subscribe(
                (res) => {
                  console.debug(res);
                  this.recievedImageData = res;
                  this.base64Data = this.recievedImageData.pic;
                  this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
                  this.router.navigate(['/pocetna']);
                  this.toastr.success('Uspesno ste registrovali Rent-A-Car servis!')},
                (err) =>{
                  console.debug('Error during image saving: ' + err)
                }
              )
            },
            (err) => {
              if(err.status == 400){
                this.toastr.error("Ime kompanije je zauzeto");
              }
              else {
                console.log(err);
              }
            }
          );
        }
        else {
          this.toastr.error('Admin Rent-A-Car servisa sa datim usernameom ne postoji');
          this.regRentaForm.controls.admin.validator.apply(false);
        }
      },
      (err: any) => {
        console.log(err)
      }
    )
    
  }
  sendImage(){

  }
  //////////////////////////////////////

  ngOnInit(): void {
    this.initForm();
  }

  private initForm()
  {
    this.regRentaForm = new FormGroup({
      'naziv': new FormControl('', Validators.required),
      'adresa': new FormControl('', Validators.required),
      'Grad': new FormControl('', Validators.required),
      'Drzava': new FormControl('', Validators.required),
      'opis': new FormControl('', Validators.required),
      'slika': new FormControl('', Validators.required),
      'admin': new FormControl('', Validators.required)
    });
  }


  onBack()
  {
    this.location.back();
  }

}
