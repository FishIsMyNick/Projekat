import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-confirm-reg',
  templateUrl: './confirm-reg.component.html'
})
export class ConfirmRegComponent implements OnInit {
  username: string;

  constructor(public service: UserService, private route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.username = params['username'];
    })
    console.log(this.username)
   }

  ngOnInit(): void {
    this.confirmRegistration();
  }

  confirmRegistration(): void{
    this.service.activateAccount(this.username).subscribe(
      (res: any) =>{
        console.log(res);
      }
    )
  }
}
