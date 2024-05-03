// MANERA NUEVA
// TODO: Saber como emplearla

import { CanActivateFn, Router } from "@angular/router";
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const loginAuth: CanActivateFn = () => {

  const authService = inject( AuthService );
  const router      = inject( Router );

  const isAuth = authService.checkAuthentication();

  if( isAuth ) {
    router.navigateByUrl('/heroes/list');
    return true;
  }

  return false;
}
