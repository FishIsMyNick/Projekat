import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PocetnaStranaComponent } from './Komponente/Deljeno-avio-renta/pocetna-strana/pocetna-strana.component';
import { RegistracijaComponent } from './Komponente/Korisnicki/registracija/registracija.component';
import { KontaktComponent } from './Komponente/Deljeno-avio-renta/kontakt/kontakt.component';
import { LoginComponent } from './Komponente/Korisnicki/login/login.component';
import { BrzeRezervacijeComponent } from './Komponente/Deljeno-avio-renta/brze-rezervacije/brze-rezervacije.component';
import { AvioKompanijeComponent } from './Komponente/Avio/avio-kompanije/avio-kompanije.component';
import { RentACarComponent } from './Komponente/Renta/rent-a-car/rent-a-car.component';
import { ProfilAdminaComponent } from './Komponente/Korisnicki/profil-admina/profil-admina.component';
import { RegAdminaAvioComponent } from './Komponente/Korisnicki/reg-admina-avio/reg-admina-avio.component';
import { RegAdminaRenteComponent } from './Komponente/Korisnicki/reg-admina-rente/reg-admina-rente.component';
import { RegAvioKompanijuComponent } from './Komponente/Korisnicki/reg-avio-kompaniju/reg-avio-kompaniju.component';
import { RegRentaKompanijuComponent } from './Komponente/Korisnicki/reg-renta-kompaniju/reg-renta-kompaniju.component';
import { LetoviComponent } from './Komponente/Avio/letovi/letovi.component';
import { SveRenteComponent } from './Komponente/Renta/sve-rente/sve-rente.component';
import { ProfilRegistrovanogComponent } from './Komponente/Korisnicki/profil-registrovanog/profil-registrovanog.component';
import { ProfilAvioComponent } from './Komponente/Avio/profil-avio/profil-avio.component';
import { PrijateljiComponent } from './Komponente/Korisnicki/prijatelji/prijatelji.component';
import { IstorijaComponent } from './Komponente/Korisnicki/istorija/istorija.component';
import { VozilaComponent } from './Komponente/Renta/vozila/vozila.component';
import { CenovnikComponent } from './Komponente/Renta/cenovnik/cenovnik.component';


const routes: Routes = [
  { path:'', redirectTo:'pocetna', pathMatch:'full'},
  { path:'pocetna', component: PocetnaStranaComponent},
  { path:'registration', component: RegistracijaComponent},
  { path:'kontakt', component: KontaktComponent},
  { path:'login', component: LoginComponent},
  { path:'brzeRezervacije', component: BrzeRezervacijeComponent},
  { path:'avioKompanije', component: AvioKompanijeComponent},
  { path:'letovi/:naziv', component: LetoviComponent},
  { path:'rentAcar', component: RentACarComponent},
  { path:'sveRente', component: SveRenteComponent},
  { path:'profilAdmina', component: ProfilAdminaComponent},
  { path:'regAdminaAvio', component: RegAdminaAvioComponent},
  { path:'regAdminaRente', component: RegAdminaRenteComponent},
  { path:'regAvioKomp', component: RegAvioKompanijuComponent},
  { path:'regRentaKomp', component: RegRentaKompanijuComponent},
  { path:'profilKorisnika', component: ProfilRegistrovanogComponent},
  { path:'profilAvio', component: ProfilAvioComponent},
  { path:'prijatelji', component: PrijateljiComponent},
  { path:'istorija', component: IstorijaComponent},
  { path:'vozila', component: VozilaComponent},
  { path:'cenovnik', component: CenovnikComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
