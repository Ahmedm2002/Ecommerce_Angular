import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { SignupComponent } from './Components/Auth/signup/signup.component';
import { DashboardComponent } from './Components/Admin/dashboard/dashboard.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { authGuard } from './Services/Guards/authGuard/auth.guard';
import { adminAuthGuard } from './Services/Guards/adminAuth/admin-auth.guard';
import { HomeComponent } from './Components/home/home.component';
import { UsersComponent } from './Components/Admin/users/users.component';
import { ProductsComponent } from './Components/Admin/products/products.component';
import { AddNewProductComponent } from './Components/Admin/add-new-product/add-new-product.component';

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
        children: [
          {
            path: 'users',
            component: UsersComponent,
          },
          {
            path: 'products',
            component: ProductsComponent,
          },
          {
            path: 'add-new-product',
            component: AddNewProductComponent,
          },
        ],
      },
    ],
  },
];
