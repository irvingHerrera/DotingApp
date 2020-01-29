import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AlertifyService } from '../service/AlertifyService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  userName: string;

  constructor(private authService: AuthService,
              private alertifyService: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    if (this.authService.decodedToken.unique_name) {
      this.userName = this.authService.decodedToken.unique_name;
    }

  }

  login() {
    console.log(this.model);
    this.authService.login(this.model)
    .subscribe(next => {
      console.log('login', next);
      this.alertifyService.success('Logged in succesfully');
      this.userName = this.authService.decodedToken.unique_name;
    }, error => {
      this.alertifyService.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertifyService.message('logged out');
    this.router.navigate(['/home']);
  }

}
