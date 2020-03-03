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
  imgUser: string;

  constructor(private authService: AuthService,
              private alertifyService: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    if (this.authService.decodedToken) {
      this.userName = this.authService.decodedToken.unique_name;
    }

    if (this.authService.currentUser) {
      this.imgUser = this.authService.currentUser.photoUrl;
    }

    console.log('this.authService.currentUser.photoUrl', this.authService.currentUser);
  }

  login() {
    console.log(this.model);
    this.authService.login(this.model)
    .subscribe(next => {
      console.log('login', next);
      this.alertifyService.success('Logged in succesfully');
      this.userName = this.authService.decodedToken.unique_name;
      this.imgUser = this.authService.currentUser.photoUrl;
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
    localStorage.removeItem('user');
    this.authService.currentUser = null;
    this.authService.decodedToken = null;
    this.alertifyService.message('logged out');
    this.router.navigate(['/home']);
  }

}
