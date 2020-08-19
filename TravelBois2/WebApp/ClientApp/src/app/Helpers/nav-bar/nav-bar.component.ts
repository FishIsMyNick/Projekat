import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/users/user/user';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {
  user: User;
  constructor() { }

  ngOnInit(): void {
  }

  getType(){
    return AppComponent.currentUser.constructor.name;
  }
}
