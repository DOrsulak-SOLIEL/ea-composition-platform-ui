import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AppStorageService } from '../services/storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private storageService: AppStorageService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
/*    if (this.storageService.authenticated()) {
      return true;
    }*/
    // navigate to login page
    /*console.log('guard routing to logged out dashboard');
    this.router.navigate(['/login/dashboard']);*/
    // you can save redirect url so after authing we can move them back to the page they requested
    return true;
  }
}
