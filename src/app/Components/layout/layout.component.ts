import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  storedUser: any = null;
  router = inject(Router);

  ngOnInit(): void {
    this.storedUser = localStorage.getItem('user');
    this.storedUser = JSON.parse(this.storedUser);
    if (!this.storedUser) {
      this.router.navigateByUrl('login');
    }
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
