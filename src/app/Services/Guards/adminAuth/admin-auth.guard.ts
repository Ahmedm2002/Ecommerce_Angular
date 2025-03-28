import { CanActivateFn, Router } from '@angular/router';
import { IUser } from '../../../Models/Interface/user.interface';
import { inject } from '@angular/core';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const storedUser = localStorage.getItem('user');
  const router = inject(Router);
  if (storedUser) {
    const user: IUser = JSON.parse(storedUser);
    if (user.role == 'admin') {
      return true;
    } else {
      router.navigateByUrl('');
      return false;
    }
  } else {
    router.navigateByUrl('login');
    return false;
  }
};
