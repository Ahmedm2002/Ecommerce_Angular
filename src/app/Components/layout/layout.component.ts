import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  constructor(private router: Router) {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      this.router.navigateByUrl('login');
    }
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
