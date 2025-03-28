import { Component, inject } from '@angular/core';
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
  userService = inject(UsersService);
  router = inject(Router);

  signUpForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    role: new FormControl('', [Validators.required]),
  });

  signup(event: Event) {
    event.preventDefault();
    const newUser: IUser = {
      ...this.signUpForm.value,
    };
    this.userService.createUser(this.signUpForm.value).subscribe(
      (res: any) => {
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
      }
    );
  }
}
