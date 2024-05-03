import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  private checkAuthStatus(): Observable<boolean> {
    return this.authService.checkAuthentication()
      .pipe(
        tap( auth => {
          if( auth ) {
            this.router.navigate(['./']);
          }
        }),
        // TODO: Entender la función de este map
        map( auth => !auth )
      )
  }


  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> {
    return this.checkAuthStatus();
  }

}
