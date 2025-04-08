import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../Services/User/users.service';
import { IUser } from '../../../Models/Interface/user.interface';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user: IUser = JSON.parse('user');
      if (user.role == 'admin') {
        this.router.navigateByUrl('dashboard');
      } else {
        this.router.navigateByUrl('');
      }
    }
  }
  userService = inject(UsersService);
  router = inject(Router);
  loggInUser!: IUser;
  login() {
    this.userService.login(this.loginForm.value).subscribe((res: any) => {
      this.loggInUser = res[0];
      if (!this.loggInUser) {
        alert('Email not found. Please try again');
        return;
      }
      if (this.loggInUser.password == this.loginForm.value['password']) {
        if (localStorage.getItem('user')) {
          localStorage.removeItem('user');
        }
        localStorage.setItem('user', JSON.stringify(this.loggInUser));
        if (this.loggInUser.role == 'admin') {
          this.router.navigateByUrl('dashboard');
        } else this.router.navigateByUrl('');
        alert('Login Success');
      } else {
        alert('Incorrect password, please try again !');
      }
    });
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });
}
