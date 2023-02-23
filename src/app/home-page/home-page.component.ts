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
  imageObject = [
    {
      video: 'https://www.youtube.com/watch?v=BiTeY6CkSbQ',
      title: 'ACCION LABS GLOBAL INNOVATIVE SUMMIT',
      alt: 'youtube video',
    },
    {
      video: 'https://www.youtube.com/watch?v=3aH3iBp5fD0',
      title: 'HERE YOU GO',
    },
    {
      video: 'https://youtu.be/LXRJsPefnYo',
      title: 'WE ARE HIRING',
      alt: 'youtube video',
      // video:
      //   'https://sanjayv.github.io/ng-image-slider/contents/assets/video/movie2.mp4',
      // posterImage:

      // title: 'Youtube example one with title.',
    },
  ];
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
