import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../../Services/UserServices/users.service';
@Component({
  selector: 'app-signup',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  // constructor(private userService: UsersService) {}

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
    role: new FormControl('user'),
  });
  signup(evnet: Event) {
    evnet.preventDefault();
    console.log(this.signUpForm.value);
    // this.userService.createUser(this.signUpForm.value).subscribe(
    //   (res: any) => {
    //     console.log(res);
    //     alert(`user created: ${res}`);
    //   },
    //   (error) => {
    //     console.log(error);
    //     alert(`Error: ${error}`);
    //   }
    // );
  }
}
