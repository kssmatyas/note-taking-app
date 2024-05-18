import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}
  
    canActivate( route: ActivatedRouteSnapshot,  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
      const email = JSON.parse(localStorage.getItem('email') as string);      

      if (email == null || email === '') {
        this.router.navigateByUrl('/login')
          .then(_ => {
             return false;
        });
      }

      return true;
    }
  
  }