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
  storedUser = localStorage.getItem('user');
  router = inject(Router);
  ngOnInit(): void {
    if (!this.storedUser) {
      this.router.navigateByUrl('login');
    }
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
