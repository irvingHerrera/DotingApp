import { Injectable } from "@angular/core";
import { Resolve, ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../service/user.service';
import { AlertifyService } from '../service/AlertifyService';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {

  constructor(private userService: UserService,
              private alertifyService: AlertifyService,
              private route: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(route.params['id']).pipe(
      catchError( error => {
        this.alertifyService.error('Problem retrieving data');
        this.route.navigate(['/members']);
        return of(null);
      })
    );
  }

}
