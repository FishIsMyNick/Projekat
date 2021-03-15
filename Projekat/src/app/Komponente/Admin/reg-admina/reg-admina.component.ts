import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'app-reg-admina',
  templateUrl: './reg-admina.component.html'
})
export class RegAdminaComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log('registracija rent admina onSubmit()')
    this.service.registerAdmin().subscribe(
      (res: any) => {
        console.log('usao u register')
        if (res.succeeded) {
          console.log('uspeo')
          this.service.userFormModel.reset();
          this.toastr.success('Novi rent admin kreiran!', 'Registracija uspesna.');
          this.router.navigate(['/pocetna'])
        }
        else {
          console.log('nije uspeo')
          if(res.errors.length == 0){
            this.toastr.error('Vec postoji korisnik sa tim email-om!', 'Registracija neuspesna.');
          }
          else{
            res.errors.forEach(element => {
              switch(element.code){
                case 'DuplicateUserName':
                  this.toastr.error('Vec postoji korisnik sa tim imenom!', 'Registracija neuspesna.');
                  break;
                default:
                  this.toastr.error(element.description, 'Registracija neuspesna.');
                  break;
              }
            });
          }
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  onBack(){
    this.router.navigate(['/pocetna'])
  }
}
