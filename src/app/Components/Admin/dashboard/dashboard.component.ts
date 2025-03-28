import { Component } from '@angular/core';
import { UsersService } from '../../../Services/User/users.service';
import { IUser } from '../../../Models/Interface/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  allUsers: IUser[] = [];
  constructor(private userService: UsersService) {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.allUsers = res;
    });
    console.log(Boolean(this.allUsers));
    console.log(Boolean(this.allUsers.length));
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
