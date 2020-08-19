import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { element } from 'protractor';
import { RegisteredUser } from '../../../entities/users/registered-user/registered-user';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { Sediste } from '../../../entities/objects/sediste';
import { count } from 'rxjs/operators';
import { AppComponent } from '../../../app.component';
import { LetoviService } from '../../../shared/letovi.service';
import { UserService } from '../../../shared/user.service';
import { User } from '../../../entities/users/user/user';
import { Pozivnica } from '../../../entities/objects/pozivnica';

@Component({
  selector: 'app-rezervacija-leta',
  templateUrl: './rezervacija-leta.component.html'
})
export class RezervacijaLetaComponent implements OnInit {
  idLeta: number;
  idSedista: string;
  currentUser: RegisteredUser;
  aviokompanija: string;
  cenaSedista: number;
  listaPrijatelja: Array<any>;
  prijateljiUSername: Array<string>;
  prijateljiData: Array<string>;
  empty = 0;
  prijateljiForm: FormGroup;
  podaciForm: FormGroup;
  numChecked = 0;
  sediste: Sediste;
  pozivnica: Pozivnica;
  brojPreostalih = 0;
  presedanja: Array<string>;
  i = 1;
  max: number;
  emptyPres = 0;


  private seatmap = [];
  private seatConfig: any = null;

  seatChartConfig = {
    showRowsLabel: false,
    showRowWisePricing: false,
    newSeatNoForRow: false
  }

  private cart = {
    selectedSeats: [],
    seatstoStore: [],
    totalamount: 0,
    cartId: "",
    eventId: 0
  };

  constructor(private route: ActivatedRoute, private location: Location, private formBuilder: FormBuilder, private service: LetoviService, private serviceP: UserService) {
    this.currentUser = <RegisteredUser>AppComponent.currentUser;
    this.podaciForm = new FormGroup({
      'ime': new FormControl('', Validators.required),
      'prezime': new FormControl('', Validators.required),
      'brPasosa': new FormControl('', Validators.required)
    });

    this.ucitajListuPrijatelja();
    this.ucitajLetInfo();
    this.ucitajSedista();
    this.ucitajPresedanja();
    this.ucitajBrzeRezervacije();
    
  } 

  ngOnInit(): void {
    this.idLeta = parseInt(this.route.snapshot.paramMap.get("id"));
    this.aviokompanija = this.route.snapshot.paramMap.get("naziv");
    
  

      this.seatConfig = [
        {
          "seat_price": this.cenaSedista,
          "seat_map": [
            {
              "seat_label": "A",
              "layout": "ggg__ggg"
            },
            {
              "seat_label": "B",
              "layout": "ggg__ggg"
            },
            {
              "seat_label": "C",
              "layout": "ggg__ggg"
            },
            {
              "seat_label": "D",
              "layout": "ggg__ggg"
            },
            {
              "seat_label": "E",
              "layout": "ggg__ggg"
            },
            {
              "seat_label": "F",
              "layout": "ggg__ggg"
            },
            {
              "seat_label": "G",
              "layout": "ggg__ggg"
            },
            {
              "seat_label": "H",
              "layout": "ggg__ggg"
            },
            {
              "seat_label": "I",
              "layout": "ggg__ggg"
            },
            {
              "seat_label": "J",
              "layout": "ggg__ggg"
            },
            {
              "seat_label": "K",
              "layout": "ggg__ggg"
            },
            {
              "seat_label": "L",
              "layout": "ggg__ggg"
            }
          ]
        }
      ]
    
    
    this.processSeatChat(this.seatConfig);
  }

  processSeatChat(map_data: any[]) {
    if (map_data.length > 0) {
      var seatNoCounter = 1;
      for (let __counter = 0; __counter < map_data.length; __counter++) {
        var row_label = "";
        var item_map = map_data[__counter].seat_map;

        //Get the label name and price
        row_label = "Red " + item_map[0].seat_label + " - ";
        if (item_map[item_map.length - 1].seat_label != " ") {
          row_label += item_map[item_map.length - 1].seat_label;
        }
        else {
          row_label += item_map[item_map.length - 2].seat_label;
        }
        row_label += " : Din. " + map_data[__counter].seat_price;

        item_map.forEach(element => {
          var mapObj = {
            "seatRowLabel": element.seat_label,
            "seats": [],
            "seatPricingInformation": row_label
          };
          row_label = "";
          var seatValArr = element.layout.split('');
          if (this.seatChartConfig.newSeatNoForRow) {
            seatNoCounter = 1;
          }
          var totalItemCounter = 1;
          seatValArr.forEach(item => {
            var seatObj = {
              "key": element.seat_label + "_" + totalItemCounter,
              "price": map_data[__counter]["seat_price"],
              "status": "available"
            };

            if (item != "_") {
              seatObj["seatLabel"] = element.seat_label + " " + totalItemCounter;
              if (seatNoCounter < 10) {
                seatObj["seatNo"] = "" + seatNoCounter;
              }
              else {
                seatObj["seatNo"] = "" + seatNoCounter;
              }

              seatNoCounter++;
            }
            else {
              seatObj["seatLabel"] = "";
            }

            totalItemCounter++;
            mapObj["seats"].push(seatObj);
          });

          //console.log(" \n\n\n Seat Objects ", mapObj);
          this.seatmap.push(mapObj);
        });

      }
    }
  }

  public selectSeat(seatObject: any) {
    //console.log("Seat to block: ", seatObject);
    if (seatObject.status == "available") {
      seatObject.status = "booked";
      this.cart.selectedSeats.push(seatObject.seatLabel);
      this.cart.seatstoStore.push(seatObject.key);
      this.cart.totalamount += this.cenaSedista;
    }
    else if (seatObject.status = "booked") {
      seatObject.status = "available";
      var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
      if (seatIndex > -1) {
        this.cart.selectedSeats.splice(seatIndex, 1);
        this.cart.seatstoStore.splice(seatIndex, 1);
        this.cart.totalamount -= this.cenaSedista;
      }
    }
  }

  public blockSeats(seatsToBlock: string) {
    if (seatsToBlock != "") {
      var seatsToBlockArr = seatsToBlock.split(',');
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        var seat = seatsToBlockArr[index] + "";
        var seatSplitArr = seat.split("_");
        //console.log("Split seat: ", seatSplitArr);
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              //console.log("\n\n\nFound Seat to block: ", seatObj);
              seatObj["status"] = "unavailable";
              this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1] = seatObj;
              //console.log("\n\n\nSeat Obj", seatObj);
              //console.log(this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1]);
              break;
            }
          }
        }
      }
    }
  }

  processBooking() {    
    if (this.cart.selectedSeats.length > 1) {
      this.empty = 2;
    }
    else {
      this.empty = 1;

      this.idSedista = this.cart.selectedSeats[0].toString();
      var sediste = new Sediste(this.idLeta, this.idSedista, this.currentUser.Ime, this.currentUser.Prezime, this.currentUser.BrojPasosa, true, this.cenaSedista);
      this.service.rezervisiSediste(sediste).subscribe();
    }
  }

  ucitajSedista() {
    this.service.getSediste().subscribe(sedista => {
      sedista.forEach(element => {
        if (element.idLeta == this.idLeta) {
          var sediste = element.idSedista.replace(" ", "_");
          this.blockSeats(sediste);
        }        
        //this.cart.selectedSeats = this.cart.selectedSeats.filter(item => item != seat);
      })
    });
  }

  ucitajBrzeRezervacije() {
    this.service.getBrzeRezervacije().subscribe(sedista => {
      sedista.forEach(element => {
        if (element.idLeta == this.idLeta) {
          var sediste = element.idSedista.replace(" ", "_");
          this.blockSeats(sediste);
        }
        //this.cart.selectedSeats = this.cart.selectedSeats.filter(item => item != seat);
      })
    });
  }

  ucitajLetInfo() {
    this.service.getLetovi().subscribe(letovi => {
      letovi.forEach(element => {
        if (element.id == this.idLeta) {
          this.cenaSedista = element.cenaKarte;
        }
      })
    });
  }

  ucitajPresedanja() {
    this.presedanja = new Array<string>();
    this.service.getPresedanja().subscribe(presedanja => {
      presedanja.forEach(element => {
        if (element.LetId == this.idLeta) {
          this.presedanja.push(element.grad + ', ' + element.drzava);
          this.emptyPres = 1;
        }
      })
    })
  }

  ucitajListuPrijatelja() {///
    this.listaPrijatelja = new Array<any>();
    this.prijateljiUSername = new Array<string>();

    this.serviceP.getPrijatelji().subscribe(prijatelji => {
      prijatelji.forEach(element => {
        if (element.username1 == this.currentUser.Username) {
          this.prijateljiUSername.push(element.username2);
        }
        else if (element.username2 == this.currentUser.Username) {
          this.prijateljiUSername.push(element.username1);
        }
      })
    });

    this.prijateljiData = new Array<string>();

    this.serviceP.getUsers().subscribe(korisnici => {
      this.listaPrijatelja = korisnici;

      this.listaPrijatelja.forEach(element => {
        this.prijateljiUSername.forEach(p => {
          if (p == element.userName) {
            this.prijateljiData.push(element.name + " " + element.lastname + " " + element.userName);
          }
        })
      })
    });      

    this.prijateljiForm = this.formBuilder.group({
      prijatelji: new FormArray([])
    });
  }  

  onCheckboxChange(e) {
    const prijatelji: FormArray = this.prijateljiForm.get('prijatelji') as FormArray;
    if (e.target.checked) {
      if (!prijatelji.value.includes(e.target.value)) {
        if (prijatelji.length <= (this.cart.selectedSeats.length - 2)) {
          prijatelji.push(new FormControl(e.target.value));
        }
      }
      if (this.numChecked <= (this.cart.selectedSeats.length - 2)) {
        this.numChecked++;
      } else {        
        e.target.checked = false;
      }
    }
    else {
      const index = prijatelji.controls.findIndex(x => x.value === e.target.value);
      prijatelji.removeAt(index);

      if (this.numChecked > 0)
      {
          this.numChecked--;
      }      
    }    
  }

  PrijateljiCheckBox() {
    this.idSedista = this.cart.selectedSeats[0].toString(); ///moje sediste
    
    var sediste = new Sediste(this.idLeta, this.idSedista, this.currentUser.Ime, this.currentUser.Prezime, this.currentUser.BrojPasosa, true, this.cenaSedista);
    this.service.rezervisiSediste(sediste).subscribe();

    var lista = new Array<string>();
    lista = this.prijateljiForm.get('prijatelji').value;

    if (lista.length == (this.cart.selectedSeats.length - 1)) {
      this.cart.selectedSeats.splice(0, 1);
       ////REZERVISANO VISE SEDISTA SVE ZA PRIAJTELJENJE
            ///POSALJI IM MEJL

      lista.forEach(element => {
        var username = element.split(" ");
        this.listaPrijatelja.forEach(p => {
          if (p.userName == username[2]) {
            this.idSedista = this.cart.selectedSeats[0].toString(); 
            this.cart.selectedSeats.splice(0, 1);
            this.sediste = new Sediste(this.idLeta, this.idSedista, p.name, p.lastname, p.brojPasosa, false, this.cenaSedista);
            this.pozivnica = new Pozivnica(this.idLeta, this.idSedista, p.name, p.lastname, p.brojPasosa, true, this.cenaSedista, this.currentUser.Username);
            this.service.rezervisiSediste(this.sediste).subscribe();
            this.service.posaljiPozivnicu(this.pozivnica).subscribe();
          }
        })
      })
     
      this.empty = 1;

    }
    else {        //REGISTROVANI I NEREGISTROVANI PRIAJTELJI
      this.cart.selectedSeats.splice(0, 1);
      lista.forEach(element => {
        var username = element.split(" ");
        this.listaPrijatelja.forEach(p => {
          if (p.userName == username[2]) {
            this.idSedista = this.cart.selectedSeats[0].toString(); 
            this.cart.selectedSeats.splice(0, 1);
            this.sediste = new Sediste(this.idLeta, this.idSedista, p.name, p.lastname, p.brojPasosa, false, this.cenaSedista);
            this.pozivnica = new Pozivnica(this.idLeta, this.idSedista, p.name, p.lastname, p.brojPasosa, true, this.cenaSedista, this.currentUser.Username);
            this.service.rezervisiSediste(this.sediste).subscribe();
            this.service.posaljiPozivnicu(this.pozivnica).subscribe();
          }
        })
      })

      this.empty = 3;
      this.brojPreostalih = this.cart.selectedSeats.length;
      this.max = this.brojPreostalih;
    }   
  }

  PodaciUneti() {   ////////NEREGISTROVANI PRIJATELJI
    this.idSedista = this.cart.selectedSeats[0].toString(); 
    this.cart.selectedSeats.splice(0, 1);
    this.sediste = new Sediste(this.idLeta, this.idSedista, this.podaciForm.get('ime').value, this.podaciForm.get('prezime').value, this.podaciForm.get('brPasosa').value.toString(), true, this.cenaSedista);
    this.service.rezervisiSediste(this.sediste).subscribe();
    this.brojPreostalih = this.cart.selectedSeats.length;

    if (this.brojPreostalih > 0) {
      this.i += 1;
      this.podaciForm.controls['ime'].setValue('');
      this.podaciForm.controls['prezime'].setValue('');
      this.podaciForm.controls['brPasosa'].setValue(0);
    }
    else {
      this.empty = 1;
    }
  }

  onBack() {
    if (this.empty == 0) {
      this.location.back();
    }
    else if (this.empty == 1) {
      this.location.back();
    }
    else if (this.empty == 2) {
      this.empty = 0;
    }
    else if (this.empty == 3) {
      this.empty = 2;
    }
  }
}
