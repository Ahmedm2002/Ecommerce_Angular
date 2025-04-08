import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../Services/User/users.service';
import { IUser } from '../../../Models/Interface/user.interface';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from '../../Modals/edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  imports: [CommonModule, EditUserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  allUsers: IUser[] = [];
  userService = inject(UsersService);
  toBeUpdaetdUser: IUser = {};
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.allUsers = res;
    });
  }
  editUser(user: IUser) {
    this.toBeUpdaetdUser = user;
  }
  deleteUser(userDel: any) {
    if (userDel.role == 'admin') {
      if (confirm(`Are you sure to delete admin ${userDel.name}`)) {
        this.userService.deleteUser(userDel.id).subscribe((res: any) => {
          this.allUsers = this.allUsers.filter((user) => user.id != userDel.id);
        });
      }
    } else {
      if (confirm(`${userDel.name} will be deleted`)) {
        this.userService.deleteUser(userDel.id).subscribe((res: any) => {
          this.allUsers = this.allUsers.filter((user) => user.id != userDel.id);
        });
      }
    }
  }
  handleUpdate(updatedUser: any) {
    const index = this.allUsers.findIndex((user) => user.id == updatedUser.id);
    this.allUsers[index] = updatedUser;
  }
}
