import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../shared/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { RegisteredUser } from '../../../entities/users/registered-user/registered-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }
  socialProvider = "google";

  userDetails;

  constructor( private service: UserService, 
              private router: Router, 
              private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/pocetna');
    }
  }
  
  


  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.toastr.success("Uspesno ste se ulogovali!", "Logovanje uspesno.");
        AppComponent.currentUser = res.user as RegisteredUser;
        var test = AppComponent.currentUser;
        console.log('test ' + test.brojTelefona);
        console.log('AC ' + AppComponent.currentUser.brojTelefona);
        this.router.navigate(['/pocetna'])
      },
      (err) =>{
        if (err.status == 400) {
          this.toastr.error("Username ili password nisu ispravni!", "Logovanje neuspesno.");
        }
        else {
          console.log(err);
        }
      }
    );
  }
}
