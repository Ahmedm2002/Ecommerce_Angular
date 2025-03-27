import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../../Services/UserServices/users.service';
import { IUser } from '../../../Models/Interface/user.interface';
@Component({
  selector: 'app-signup',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private userService: UsersService) {}

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
    const userId = this.userService.generateUserId();
    const newUser: IUser = {
      name,
      email,
      password,
      role: 'user',
      userId,
    };
    this.userService.createUser(this.signUpForm.value).subscribe(
      (res: any) => {
        console.log(res);
        alert(`user created: ${res}`);
      },
      (error) => {
        console.log(error);
        alert(`Error: ${error}`);
      }
    );
  }
}
