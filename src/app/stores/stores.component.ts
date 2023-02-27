import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent {
  constructor(private router: Router) {}
  Logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
