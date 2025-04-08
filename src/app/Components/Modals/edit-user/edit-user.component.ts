import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IUser } from '../../../Models/Interface/user.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../Services/User/users.service';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnChanges, OnInit {
  @Input() user: IUser = {};
  @Output() updatedUser = new EventEmitter<IUser>();

  updateUser: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    role: new FormControl(),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.updateUser.patchValue(this.user);
    }
  }

  ngOnInit(): void {
    this.updateUser.controls['name'].disable();
    this.updateUser.controls['email'].disable();
  }

  userService = inject(UsersService);

  onSubmit() {
    this.userService
      .updateUser({
        ...this.user,
        role: this.updateUser.controls['role'].value,
      })
      .subscribe(
        (res) => {
          alert('User updated successfully');
          this.updatedUser.emit({
            ...this.user,
            role: this.updateUser.controls['role'].value,
          });
        },
        (error) => {
          alert('An unexpected error occured. Please try again');
          console.log(error);
        }
      );
  }

  checkEquality(): boolean {
    return this.user.role == this.updateUser.controls['role'].value
      ? true
      : false;
  }
}
