import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { GoogleMapsModule } from "@angular/google-maps";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

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
import { ProfilAdminaComponent } from './Komponente/Admin/profil-admina/profil-admina.component';
import { RegAdminaRenteComponent } from './Komponente/Admin/reg-admina-rente/reg-admina-rente.component';
import { RegAdminaAvioComponent } from './Komponente/Admin/reg-admina-avio/reg-admina-avio.component';
import { RegAvioKompanijuComponent } from './Komponente/Admin/reg-avio-kompaniju/reg-avio-kompaniju.component';
import { RegRentaKompanijuComponent } from './Komponente/Admin/reg-renta-kompaniju/reg-renta-kompaniju.component';
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
import { MapsComponent } from './Komponente/Deljeno-avio-renta/maps/maps.component';
import { UserService } from './shared/user.service';
import { OcenjivanjeComponent } from './Komponente/Deljeno-avio-renta/ocenjivanje/ocenjivanje.component';
import { OceniLetComponent } from './Komponente/Avio/oceni-let/oceni-let.component';
import { PozivniceComponent } from './Komponente/Korisnicki/pozivnice/pozivnice.component';
import { RezervacijaLetaComponent } from './Komponente/Avio/rezervacija-leta/rezervacija-leta.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './shared/auth.interceptor';
import { BrzeRezervacijeAdminComponent } from './Komponente/Avio/brze-rezervacije-admin/brze-rezervacije-admin.component';
import { LetBrzaRezervacijaComponent } from './Komponente/Avio/let-brza-rezervacija/let-brza-rezervacija.component';

import { FileUploadModule } from 'ng2-file-upload';
import { InfoStranicaComponent } from './Komponente/Renta/info-stranica/info-stranica.component';
import { ProfilRentaComponent } from './Komponente/Renta/profil-renta/profil-renta.component';
import { DashboardComponent } from './Komponente/Korisnicki/dashboard/dashboard.component';

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
    DestinacijeAvioComponent,
    MapsComponent,
    OcenjivanjeComponent,
    OceniLetComponent,
    PozivniceComponent,
    RezervacijaLetaComponent,
    BrzeRezervacijeAdminComponent,
    LetBrzaRezervacijaComponent,
    InfoStranicaComponent,
    ProfilRentaComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    ToastrModule.forRoot(),
    FileUploadModule
  ],
  providers: [AppComponent, UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
