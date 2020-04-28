import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../models/Pagination';
import { User } from '../models/User';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../service/AlertifyService';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  users: User[];
  pagination: Pagination;
  likesParam: string;

  constructor(private authService: AuthService,
              private userService: UserService,
              private route: ActivatedRoute,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likesParam = 'Likers';
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService
    .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertifyService.error(error);
    });
  }

}
