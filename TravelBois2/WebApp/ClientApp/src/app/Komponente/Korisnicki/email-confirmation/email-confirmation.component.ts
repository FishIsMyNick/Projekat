import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html'
})
export class EmailConfirmationComponent implements OnInit {
  token: string = "";
  username: string = "";
  show: boolean = false;

  constructor(private activeRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(
      params =>
      {
        this.token = params['token'];
        this.username = params['username'];

        // this.userService.verifyEmail(this.token,this.username).subscribe(
        //   (result:any) => {
        //     if(result.succeeded){
        //       this.show = true;
        //     }
        //     else{
        //       this.show = false;
        //     }
        //   },
        //   error => {
        //     console.log(error);
        //   }
        // )
      }
    )
  }

}
