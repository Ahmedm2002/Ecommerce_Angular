import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IUser } from '../../Models/Interface/user.interface';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  storedUser = localStorage.getItem('user');
  user: any;

  router = inject(Router);
  ngOnInit(): void {
    if (!this.storedUser) {
      this.router.navigateByUrl('login');
    } else {
      this.user = JSON.parse(this.storedUser);
    }
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
