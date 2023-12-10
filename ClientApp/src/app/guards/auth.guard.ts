import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { NgToastService, Position } from 'ng-angular-popup';

export const authGuard: CanActivateFn = (route, state) => {

  // injecting dependencies instead of the constructor (the new way to inject in gurads in angular v16)
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(NgToastService);

  if (authService.isloggedIn())
  {
    return true;
  }
  else
  {
    toast.error({detail: "Error", summary: "عذرا، يجب تسجيل الدخول أولا", position:'topCenter'} );
    router.navigate(['/']);
    
    return false;
  }
};
