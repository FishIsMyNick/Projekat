import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location} from '@angular/common';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reg-admina-avio',
  templateUrl: './reg-admina-avio.component.html'
})
export class RegAdminaAvioComponent implements OnInit {
  regAvioForm: FormGroup;
  constructor(private location: Location, public service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.avioAdminFormModel.reset();
  }

  onSubmit(){
    console.log('registracija avio admina onSubmit()')
    this.service.registerAvioAdmin().subscribe(
      (res: any) => {
        console.log('usao u register')
        if (res.succeeded) {
          console.log('uspeo')
          this.service.userFormModel.reset();
          this.toastr.success('Novi avio admin kreiran!', 'Registracija uspesna.');
          this.router.navigate(['/pocetna'])
        }
        else {
          console.log('nije uspeo')
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
      },
      err => {
        console.log(err);
      }
    )
  }

  onBack()
  {
    this.location.back();
  }

}
