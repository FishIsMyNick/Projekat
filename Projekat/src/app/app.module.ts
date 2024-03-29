import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

//import { GoogleMapsModule } from "@angular/google-maps";
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
//import { RentACarComponent } from './Komponente/Renta/rent-a-car/rent-a-car.component';
import { ProfilAdminaComponent } from './Komponente/Admin/profil-admina/profil-admina.component';
import { RegAdminaRenteComponent } from './Komponente/Admin/reg-admina-rente/reg-admina-rente.component';
import { RegAdminaAvioComponent } from './Komponente/Admin/reg-admina-avio/reg-admina-avio.component';
import { RegAvioKompanijuComponent } from './Komponente/Admin/reg-avio-kompaniju/reg-avio-kompaniju.component';
import { RegRentaKompanijuComponent } from './Komponente/Admin/reg-rent-kompaniju/reg-rent-kompaniju.component';
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
import { IzvestajOPoslovanjuComponent } from './Komponente/Renta/izvestaj-o-poslovanju/izvestaj-o-poslovanju.component';
import { RaspolozivostVozilaComponent } from './Komponente/Renta/raspolozivost-vozila/raspolozivost-vozila.component';
import { IzvestajOPoslovanjuAvioComponent } from './Komponente/Avio/izvestaj-o-poslovanju-avio/izvestaj-o-poslovanju-avio.component';
import { CenovnikAvioComponent } from './Komponente/Avio/cenovnik-avio/cenovnik-avio.component';
import { ListaLetovaComponent } from './Komponente/Avio/lista-letova/lista-letova.component';
import { DodajLetComponent } from './Komponente/Avio/dodaj-let/dodaj-let.component';
import { DestinacijeAvioComponent } from './Komponente/Avio/destinacije-avio/destinacije-avio.component';
//import { MapsComponent } from './Komponente/Deljeno-avio-renta/maps/maps.component';
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

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';
import { DashboardComponent } from './Komponente/Korisnicki/dashboard/dashboard.component';
import { PromenaLozinkeComponent } from './Komponente/Korisnicki/promena-lozinke/promena-lozinke.component';
import { FilijaleComponent } from './Komponente/Renta/filijale/filijale.component';
import { IzmeniFilijaluComponent } from './Komponente/Renta/izmeni-filijalu/izmeni-filijalu.component';

import { ChartsModule } from 'ng2-charts';
import { RegAdminaComponent } from './Komponente/Admin/reg-admina/reg-admina.component';
import { ConfirmRegComponent } from './Komponente/Korisnicki/confirm-reg/confirm-reg.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RentMapComponent } from './Komponente/Renta/rent-map/rent-map.component';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';

//social login
let config = new AuthServiceConfig([
  {
     id: GoogleLoginProvider.PROVIDER_ID,
     provider: new GoogleLoginProvider("768549485765-p3od3ncie24fule8sgub16ie7jpmu1dc.apps.googleusercontent.com")
  }
]);
export function provideConfig()
 {
    return config;
 }

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
    IzvestajOPoslovanjuComponent,
    RaspolozivostVozilaComponent,
    IzvestajOPoslovanjuAvioComponent,
    CenovnikAvioComponent,
    ListaLetovaComponent,
    DodajLetComponent,
    DestinacijeAvioComponent,
    OcenjivanjeComponent,
    OceniLetComponent,
    PozivniceComponent,
    RezervacijaLetaComponent,
    BrzeRezervacijeAdminComponent,
    LetBrzaRezervacijaComponent,
    InfoStranicaComponent,
    ProfilRentaComponent,
    DashboardComponent,
    PromenaLozinkeComponent,
    FilijaleComponent,
    IzmeniFilijaluComponent,
    RegAdminaComponent,
    ConfirmRegComponent,
    RentMapComponent
    
    //EmailConfirmationComponent,
    //MapsComponent,
    //RentACarComponent,
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule,
    //GoogleMapsModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    ToastrModule.forRoot(),
    FileUploadModule,
    ChartsModule,
    LeafletModule,
    SocialLoginModule.initialize(config)  //social login
  ],
  providers: [AppComponent, UserService,
    {
      //social login
      provide: [AuthServiceConfig, HTTP_INTERCEPTORS],
      useFactory: provideConfig,
      //provide: HTTP_INTERCEPTORS,
      //useClass: AuthInterceptor,
      //multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
