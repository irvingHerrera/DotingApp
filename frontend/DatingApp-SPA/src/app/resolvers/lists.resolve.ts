import { Injectable } from "@angular/core";
import { Resolve, ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../service/user.service';
import { AlertifyService } from '../service/AlertifyService';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ListsResolver implements Resolve<User[]> {

  pagenumber = 1;
  pageSize = 5;
  likesParam = 'Likers';

  constructor(private userService: UserService,
              private alertifyService: AlertifyService,
              private route: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pagenumber, this.pageSize, null, this.likesParam).pipe(
      catchError( error => {
        this.alertifyService.error('Problem retrieving data');
        this.route.navigate(['/home']);
        return of(null);
      })
    );
  }

}
