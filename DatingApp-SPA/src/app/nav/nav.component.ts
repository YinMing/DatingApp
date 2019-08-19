import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any = {};
 

  constructor(public authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login(f: NgForm) {
    this.model = f.value;
    // console.log(this.model);
    this.authService.login(this.model).subscribe(next => this.alertify.success('logged in successfully')
      , error => this.alertify.error('fail to login: ' + error));

  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
  }

}
