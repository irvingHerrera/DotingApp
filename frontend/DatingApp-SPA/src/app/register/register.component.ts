import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AlertifyService } from '../service/AlertifyService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model)
    .subscribe(() => {
      this.alertifyService.success('Registration succesfully');
    }, error => {
      this.alertifyService.error(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
