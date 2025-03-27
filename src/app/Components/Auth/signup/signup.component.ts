import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../../Services/User/users.service';
import { IUser } from '../../../Models/Interface/user.interface';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-signup',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private userService: UsersService, private router: Router) {}

  signUpForm: FormGroup = new FormGroup({
    name: new FormControl('Ahmed', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('ahmed@a.com', [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
    ]),
    password: new FormControl('asdfasf', [
      Validators.required,
      Validators.minLength(5),
    ]),
    role: new FormControl('user'),
  });

  signup(event: Event) {
    event.preventDefault();
    const { name, email, password } = this.signUpForm.value;
    const newUser: IUser = {
      name,
      email,
      password,
      role: 'user',
    };
    this.userService.createUser(this.signUpForm.value).subscribe(
      (res: any) => {
        alert('Success');
        console.log(res);
        this.signUpForm.reset();
        localStorage.setItem('user', JSON.stringify(res));
        if (newUser.role == 'user') {
          this.router.navigateByUrl('/');
        } else {
          this.router.navigateByUrl('dashbaord');
        }
      },
      (error) => {
        console.log(error);
        alert(`Error: ${error}`);
      }
    );
  }
}
