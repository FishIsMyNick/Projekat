import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {ReactiveFormsModule, FormsModule} from'@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaStranaComponent } from './Komponente/Deljeno-avio-renta/pocetna-strana/pocetna-strana.component';
import { KontaktComponent } from './Komponente/Deljeno-avio-renta/kontakt/kontakt.component';
import { NavBarComponent } from './Helpers/nav-bar/nav-bar.component';
import { RegistracijaComponent } from './Komponente/Korisnicki/registracija/registracija.component';
import { LoginComponent } from './Komponente/Korisnicki/login/login.component';
import { BrzeRezervacijeComponent } from './Komponente/Deljeno-avio-renta/brze-rezervacije/brze-rezervacije.component';
import { AvioKompanijeComponent } from './Komponente/Avio/avio-kompanije/avio-kompanije.component';
import { RentACarComponent } from './Komponente/Renta/rent-a-car/rent-a-car.component';
import { ProfilAdminaComponent } from './Komponente/Korisnicki/profil-admina/profil-admina.component';
import { RegAdminaRenteComponent } from './Komponente/Korisnicki/reg-admina-rente/reg-admina-rente.component';
import { RegAdminaAvioComponent } from './Komponente/Korisnicki/reg-admina-avio/reg-admina-avio.component';
import { RegAvioKompanijuComponent } from './Komponente/Korisnicki/reg-avio-kompaniju/reg-avio-kompaniju.component';
import { RegRentaKompanijuComponent } from './Komponente/Korisnicki/reg-renta-kompaniju/reg-renta-kompaniju.component';
import { DynamicImageComponent } from './Helpers/dynamic-image/dynamic-image.component';
import { LetoviComponent } from './Komponente/Avio/letovi/letovi.component';
import { SveRenteComponent } from './Komponente/Renta/sve-rente/sve-rente.component';
import { ProfilRegistrovanogComponent } from './Komponente/Korisnicki/profil-registrovanog/profil-registrovanog.component';
import { ProfilAvioComponent } from './Komponente/Avio/profil-avio/profil-avio.component';
import { PrijateljiComponent } from './Komponente/Korisnicki/prijatelji/prijatelji.component';
import { KalendarComponent } from './Helpers/kalendar/kalendar.component';
import { IstorijaComponent } from './Komponente/Korisnicki/istorija/istorija.component';
import { VozilaComponent } from './Komponente/Renta/vozila/vozila.component';
import { CenovnikComponent } from './Komponente/Renta/cenovnik/cenovnik.component';
import { DodajKolaComponent } from './Komponente/Renta/dodaj-kola/dodaj-kola.component';
import { IzvestajOPoslovanjuRentaComponent } from './Komponente/Renta/izvestaj-o-poslovanju-renta/izvestaj-o-poslovanju-renta.component';
import { RaspolozivostVozilaComponent } from './Komponente/Renta/raspolozivost-vozila/raspolozivost-vozila.component';
import { IzvestajOPoslovanjuAvioComponent } from './Komponente/Avio/izvestaj-o-poslovanju-avio/izvestaj-o-poslovanju-avio.component';
import { CenovnikAvioComponent } from './Komponente/Avio/cenovnik-avio/cenovnik-avio.component';
import { ListaLetovaComponent } from './Komponente/Avio/lista-letova/lista-letova.component';
import { DodajLetComponent } from './Komponente/Avio/dodaj-let/dodaj-let.component';
import { DestinacijeAvioComponent } from './Komponente/Avio/destinacije-avio/destinacije-avio.component';
import { UserService } from './shared/user.service';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaStranaComponent,
    KontaktComponent,
    NavBarComponent,
    RegistracijaComponent,
    LoginComponent,
    BrzeRezervacijeComponent,
    AvioKompanijeComponent,
    RentACarComponent,
    ProfilAdminaComponent,
    RegAdminaRenteComponent,
    RegAdminaAvioComponent,
    RegAvioKompanijuComponent,
    RegRentaKompanijuComponent,
    DynamicImageComponent,
    LetoviComponent,
    SveRenteComponent,
    ProfilRegistrovanogComponent,
    ProfilAvioComponent,
    PrijateljiComponent,
    KalendarComponent,
    IstorijaComponent,
    VozilaComponent,
    DodajKolaComponent,
    CenovnikComponent,
    IzvestajOPoslovanjuRentaComponent,
    RaspolozivostVozilaComponent,
    IzvestajOPoslovanjuAvioComponent,
    CenovnikAvioComponent,
    ListaLetovaComponent,
    DodajLetComponent,
    DestinacijeAvioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,    
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule
  ],
  providers: [AppComponent, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }