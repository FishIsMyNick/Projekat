import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../shared/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { RegisteredUser } from '../../../entities/users/registered-user/registered-user';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }

  userDetails;

  constructor(public service: UserService,
    private router: Router,
    private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/pocetna');
    }
  }




  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        this.toastr.success("Uspesno ste se ulogovali!", "Logovanje uspesno.");
        AppComponent.currentUser = res.user as RegisteredUser;
        var test = AppComponent.currentUser;
        console.log('test ' + test.brojTelefona);
        console.log('AC ' + AppComponent.currentUser.brojTelefona);
        this.router.navigate(['/pocetna'])
      },
      (err) => {
        if (err.error.message === "NotActivated") {
          this.toastr.error("Morate aktivirati nalog sa pristiglog email-a!");
        }
        else if (err.status == 400) {
          this.toastr.error("Username ili password nisu ispravni!", "Logovanje neuspesno.");
        }
        else {
          console.log(err);
        }
      }
    );
  }

  //social login
  SigninWithGoogle(): void {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.authService.signIn(socialPlatformProvider).then(socialusers => {
      this.service.externalLogin(socialusers).subscribe((res: any) => {
        //localStorage.setItem('token', res.token);
        //console.log(res)

        this.toastr.success("Uspesno ste se ulogovali!", "Logovanje uspesno.");
        AppComponent.currentUser = res.socAppUser as RegisteredUser;
        var test = AppComponent.currentUser;
        // console.log('test ' + test.brojTelefona);
        // console.log('AC ' + AppComponent.currentUser.brojTelefona);
        this.router.navigate(['/pocetna'])
      });
      //console.log(socialusers);
    });
  }
}
