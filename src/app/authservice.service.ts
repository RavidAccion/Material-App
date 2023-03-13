import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
export interface canComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthserviceService implements CanActivate {
  constructor(private router: Router) {}
  /*Checks route navigation before the component is loaded */
  canActivate(): any {
    const token = sessionStorage.getItem('Token');
    if (token == 'user' || token == 'admin') {
      console.log(token);
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
export class canDeactivate implements canDeactivate {
  canDeactivate(component: canComponentDeactivate): any {
    return component && component.canDeactivate
      ? component.canDeactivate()
      : true;
  }
}
