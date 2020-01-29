import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { AlertifyService } from '../service/AlertifyService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private alertifyService: AlertifyService,
              private router: Router) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertifyService.error('You shall not pass!!!');
    this.router.navigate(['/home']);
    return false;
  }
}
