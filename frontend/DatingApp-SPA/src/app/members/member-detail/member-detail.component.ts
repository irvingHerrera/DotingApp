import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AlertifyService } from 'src/app/service/AlertifyService';
import { User } from 'src/app/models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  user: User;

  constructor(private userService: UserService,
              private alertifyService: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUser();
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  loadUser() {
    this.userService.getUser(+this.route.snapshot.params['id'])
    .subscribe((user: User) => {
      this.user = user;
    }, error => {
      this.alertifyService.error(error);
    });
  }

}
