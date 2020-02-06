import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/service/AlertifyService';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm', {static: true}) editForm: NgForm;

  constructor(private route: ActivatedRoute,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.alertifyService.success('Profile update successfully');
    this.editForm.reset(this.user);
  }

}
