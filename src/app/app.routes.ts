import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { SignupComponent } from './Components/Auth/signup/signup.component';
import { DashboardComponent } from './Components/Admin/dashboard/dashboard.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { authGuard } from './Services/Guards/authGuard/auth.guard';
import { adminAuthGuard } from './Services/Guards/adminAuth/admin-auth.guard';
import { HomeComponent } from './Components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [authGuard],
      },
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [authGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [adminAuthGuard],
      },
    ],
  },
];
