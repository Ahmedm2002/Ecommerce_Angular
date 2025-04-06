import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../Services/User/users.service';
import { IUser } from '../../../Models/Interface/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  allUsers: IUser[] = [];
  userService = inject(UsersService);
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.allUsers = res;
    });
  }
  editUser(user: IUser) {
    console.log(user);
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
}
