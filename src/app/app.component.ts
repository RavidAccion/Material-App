import { Component, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  default: any = null;
  currentTheme: string = '';
  @HostBinding('class') componentCssClass: any;
  title = 'First_MAterial';
  constructor(
    public overlayContainer: OverlayContainer,
    private router: Router
  ) {}
  defaultTheme() {
    if (this.default == null) {
      this.currentTheme = 'hera';
      this.overlayContainer.getContainerElement().classList.add('hera');
      this.componentCssClass = 'hera';
      console.log(this.componentCssClass);
    }
  }
  onSetTheme(theme: any) {
    this.default = 'any';
    this.currentTheme = theme;
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }
  Logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
