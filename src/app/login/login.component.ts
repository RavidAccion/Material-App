import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: any = FormGroup;
  SignupForm: any = FormGroup;
  invaliduser: boolean = false;
  token: any = '';
  invalid: boolean = false;
  register: boolean = false;
  result: any = [];
  regArray = [
    {
      email: 'rio@gmail.com',
      mobile: 8754120000,
      name: 'ravid',
      password: '12345',
    },
  ];
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginFormBuild();
    this.signupFormBuild();
    this.getregdata();
  }

  /* Method to build the form group for get login informations */
  loginFormBuild(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      Password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  /*method to build signup form*/
  signupFormBuild(): void {
    this.SignupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
    });
  }

  /* Method to submit the login data */
  subData() {
    // if (
    //   this.loginForm.getRawValue().name == 'ravid' &&
    //   this.loginForm.getRawValue().Password == 12345
    // ) {
    //   this.token = 'user';
    //   sessionStorage.setItem('Token', this.token);
    //   this.router.navigate(['/Homepage']);
    // } else if (
    //   this.loginForm.getRawValue().name == 'admin' &&
    //   this.loginForm.getRawValue().Password == 123456
    // ) {
    //   this.token = 'admin';
    //   sessionStorage.setItem('Token', this.token);
    //   this.router.navigate(['/registration']);
    // } else {
    //   this.invalid = true;
    // }
    this.getregdata();
    if (
      this.loginForm.getRawValue().name == 'admin' &&
      this.loginForm.getRawValue().Password == 123456
    ) {
      this.token = 'admin';
      sessionStorage.setItem('Token', this.token);
      this.router.navigate(['/registration']);
    }
    Object.keys(this.result).forEach((key) => {
      console.log(this.loginForm.getRawValue(), 'ssss');
      console.log(key, this.result[key].name);
      if (
        this.result[key].name === this.loginForm.getRawValue().name &&
        this.result[key].Password === this.loginForm.getRawValue().password
      ) {
        this.token = 'user';
        sessionStorage.setItem('Token', this.token);
        sessionStorage.setItem(
          'userName',
          JSON.stringify(this.loginForm.getRawValue().name)
        );
        this.router.navigate(['/Homepage']);
      } else {
        this.invaliduser = true;
      }
    });
  }

  /*method to get valuses from the registration frorm */
  registerData() {
    // localStorage.setItem('registerData', JSON.stringify(this.regArray));
    const _tempData = JSON.parse(localStorage.getItem('registerData') || '');
    // const oldData = [...this.regArray, ..._tempData];
    if (this.SignupForm.valid) {
      // var _data = {
      //   email: this.SignupForm.getRawValue().email,
      //   mobile: this.SignupForm.getRawValue().mobile,
      //   name: this.SignupForm.getRawValue().name,
      //   password: this.SignupForm.getRawValue().password,
      // };
      // console.log(_data, 'yes');
      const _regData = [..._tempData, this.SignupForm.getRawValue()];
      localStorage.setItem('registerData', JSON.stringify(_regData));
      this.register = false;
    }
  }

  /*register data get method */
  getregdata() {
    const data = localStorage.getItem('registerData');
    this.result = JSON.parse(data || '{}');
    console.log(this.result);
  }

  /*method to toggle between login and registration screen */
  registerUser() {
    this.register = !this.register;
  }
}
