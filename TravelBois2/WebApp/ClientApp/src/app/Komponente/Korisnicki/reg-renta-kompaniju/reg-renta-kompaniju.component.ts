import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location} from '@angular/common';
import { RentAdminService } from 'src/app/shared/rent-admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentACar } from 'src/app/entities/objects/rent-a-car';
import { AppComponent } from 'src/app/app.component';
import { AnyTxtRecord } from 'dns';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reg-renta-kompaniju',
  templateUrl: './reg-renta-kompaniju.component.html'
})
export class RegRentaKompanijuComponent implements OnInit {
  regRentaForm: FormGroup;
  naziv: string;
  adresa: string;
  opis: string;
  renta: RentACar;

  public selectedFile: File = null;
  public event1;
  imgURL: string = 'https://wiki.tripwireinteractive.com/images/4/47/Placeholder.png';
  recievedImageData: any;
  base64Data: any;
  convertedImage: any;

  constructor(private location: Location, public service: RentAdminService, private router: Router, private toastr: ToastrService, private httpClient: HttpClient) { }

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
    this.naziv = this.regRentaForm.get('naziv').value;
    this.opis = this.regRentaForm.get('opis').value;
    this.adresa = this.regRentaForm.get('adresa').value;
    this.renta = new RentACar(this.naziv, this.adresa);
    this.renta.AdminID = AppComponent.currentUser.Username;

    this.service.addRentKompanija(this.renta).subscribe(
      (res: any) =>{
        const uploadData = new FormData();
        uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

        this.service.addRentImage(uploadData).subscribe(
          (res) => {
            console.debug(res);
            this.recievedImageData = res;
            this.base64Data = this.recievedImageData.pic;
            this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;},
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
      'opis': new FormControl('', Validators.required),
      'slika': new FormControl('', Validators.required)
    });
  }


  onBack()
  {
    this.location.back();
  }

}
