import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IUser } from '../../../Models/Interface/user.interface';

export const authGuard: CanActivateFn = (route, state) => {
  const storedUser = localStorage.getItem('user');
  const router = inject(Router);
  if (storedUser) {
    const user: IUser = JSON.parse(storedUser);
    if (user.role == 'admin') {
      router.navigateByUrl('dashboard');
    } else {
      router.navigateByUrl('');
    }
    return false;
  }
  return true;
};
