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
  deleteUser(userId: string | undefined) {
    this.userService.deleteUser(userId).subscribe((res: any) => {
      this.allUsers = this.allUsers.filter((user) => user.id != userId);
    });
  }
}
