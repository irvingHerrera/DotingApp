import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.authService.currentUser = user;
    this.authService.setDecodedToken();
    this.authService.changeMemberPhoto(user.photoUrl);
  }
}
