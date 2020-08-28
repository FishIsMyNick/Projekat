import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipVozila, GetStringValues } from 'src/app/_enums';
import { Kola } from 'src/app/entities/objects/kola';
import { ActivatedRoute, Router } from '@angular/router';
import { RentService } from 'src/app/shared/rent.service';
import { AppComponent } from 'src/app/app.component';
import { RentACar } from 'src/app/entities/objects/rent-a-car';

@Component({
  selector: 'app-dodaj-kola',
  templateUrl: './dodaj-kola.component.html'
})
export class DodajKolaComponent implements OnInit {
  carForm: FormGroup;
  static kola: Kola;
  renta: RentACar;

  brzaRezervacija: boolean;

  public selectedFile: File = null;
  public event1;
  imgURL: string = 'https://wiki.tripwireinteractive.com/images/4/47/Placeholder.png';
  recievedImageData: any;
  base64Data: any;
  convertedImage: string;

  constructor(private route: ActivatedRoute, private servis: RentService, private router: Router) {
   }

  ngOnInit(): void {
    let year = new Date();
    this.carForm = new FormGroup({
      'marka': new FormControl('', Validators.required),
      'model': new FormControl('', Validators.required),
      'brojMesta': new FormControl('', [Validators.required, Validators.min(1)]),
      'godiste': new FormControl('', [Validators.required, Validators.min(1900), Validators.max(year.getFullYear())]),
      'tip': new FormControl('', Validators.required),
      'cena': new FormControl('', [Validators.required, Validators.min(1)]),
      'brzaRezervacija': new FormControl(''),
      'slika': new FormControl('', Validators.required)
            })
  }
  async onSubmit() {
    console.debug('submit')
    var rent = await this.servis.GetRent(AppComponent.currentUser.userName);
    console.debug(rent.naziv);

    var kola: Kola = new Kola(
      this.carForm.get('brojMesta').value,
      this.carForm.get('godiste').value,
      this.carForm.get('marka').value,
      this.carForm.get('model').value,
      this.carForm.get('tip').value,
      rent.naziv,
      this.carForm.get('cena').value,
      this.brzaRezervacija);

    this.servis.AddCar(kola).subscribe(
      (res) => {
        console.debug('kola dodata u bp. cuvanje slike...');
        const uploadData = new FormData();
        uploadData.append('myFile', this.selectedFile);
        uploadData.append(kola.Naziv, 'filename')

        this.servis.addCarImage(uploadData).subscribe(
          (res) => {
            console.debug(res);
            this.recievedImageData = res;
            this.base64Data = this.recievedImageData.pic;
            this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
            this.router.navigate(['/pocetna'])
          },
          (err) => {
            console.debug('Error during image saving: ' + err)
          }
        )
      },
      (err) => {
        console.debug(err);
      }
    );
  }
  GetTipovi(): Array<string>
  {
    return GetStringValues(TipVozila);
  }
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
}
