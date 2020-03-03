import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/service/AlertifyService';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm', {static: false}) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute,
              private alertifyService: AlertifyService,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
    .subscribe(next => {
      this.alertifyService.success('Profile update successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertifyService.error(error);
    });
  }

  updateMemberPhoto(photoUlr: string) {
    this.user.photoUrl = photoUlr;
  }

}
