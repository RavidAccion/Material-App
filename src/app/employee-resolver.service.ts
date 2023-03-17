import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { NavItem } from './NavItem';
import { ApiServicesService } from './api-services.service';
@Injectable({
  providedIn: 'root',
})
export class EmployeeResolverService implements Resolve<any> {
  constructor(private api: ApiServicesService) {}

  async resolve(route: ActivatedRouteSnapshot) {
    this.api.getEmployeeData().subscribe((res) => {
      const employeeData = res;
      console.log('THE POST IS: ', employeeData);

      return employeeData;
    });
  }
}
