import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  showFiller = false;
  userName: any;
  name: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getName();
  }

  getName() {
    this.userName = sessionStorage.getItem('userName');
    this.name = JSON.parse(this.userName);
    console.log(this.name);
  }

  Logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  regform() {
    this.router.navigate(['registration']);
  }
}
