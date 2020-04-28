import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { AlertifyService } from 'src/app/service/AlertifyService';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: User;

  constructor(private authService: AuthService,
              private userService: UserService,
              private alertifyService: AlertifyService) { }

  ngOnInit() {

  }

  seendLike(id: number) {
    this.userService.seendLike(this.authService.decodedToken.nameid, id)
    .subscribe(s => {
      this.alertifyService.success('You have liked: ' + this.user.knownAs);
    }, error => {
      this.alertifyService.error(error);
    });
  }

}
