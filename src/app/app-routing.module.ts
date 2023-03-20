import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { AuthserviceService, canDeactivate } from './authservice.service';
import { Router } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { StoresComponent } from './stores/stores.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeResolverService } from './employee-resolver.service';
const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [AuthserviceService],
  },
  {
    path: 'Homepage',
    component: HomePageComponent,
    canActivate: [AuthserviceService],
  },
  {
    path: 'Stores',
    component: StoresComponent,
    canActivate: [AuthserviceService],
    // canDeactivate: [canDeactivate],   // hided as it is not working
  },
  {
    path: 'Employee',
    component: EmployeeComponent,
    canActivate: [AuthserviceService],
    resolve: { employeeData: EmployeeResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {}
  /*Checks route navigation before the component is loaded */
  canActivate(): any {
    const token = sessionStorage.getItem('Token');
    if (token) {
      console.log(token);
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
