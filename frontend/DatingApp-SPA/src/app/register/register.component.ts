import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AlertifyService } from '../service/AlertifyService';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService,
              private alertifyService: AlertifyService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true };
  }

  register() {

    if(this.registerForm.valid) {
      console.log('this.registerForm.value', this.registerForm.value);
      this.user = Object.assign({}, this.registerForm.value);
      console.log('this.user', this.user);
      this.authService.register(this.user).subscribe(() => {
        this.alertifyService.success('Registration successful');
      }, error => {
        this.alertifyService.error(error);
      }, () => {
        this.authService.login(this.user).subscribe( () => {
          this.router.navigate(['/members']);
        });
      });
    }

    /*this.authService.register(this.model)
    .subscribe(() => {
      this.alertifyService.success('Registration succesfully');
    }, error => {
      this.alertifyService.error(error);
    });*/
    console.log(this.registerForm);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
