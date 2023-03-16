import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServicesService } from '../api-services.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent {
  name: any;
  availableLeave: any;
  casualLeave: any;
  wellnessLeave: any;
  leavecount: any = '';
  leavelist: any;
  employeeData: any;
  leave: any = FormGroup;
  displayedColumns = [
    'Emp ID',
    'First Name',
    'Last name',
    'gender',
    'Phone Num',
  ];
  errorMessage: any;
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private api: ApiServicesService
  ) {}

  ngOnInit() {
    this.getName();
    this.loginFormBuild();
    this.getDatas();
  }
  getName() {
    var _userName = sessionStorage.getItem('userName');
    this.name = JSON.parse(_userName || '');
  }

  loginFormBuild(): void {
    this.leave = this.formBuilder.group({
      empId: ['', [Validators.required]],
      leaveType: ['', [Validators.required]],
      noOfDays: ['', [Validators.required]],
      reason: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  getDatas() {
    this.api.get_leavelist_data().subscribe((res) => {
      this.leavelist = res;
    });
    this.api.getEmployeeData().subscribe((res) => {
      this.employeeData = res;
    });
  }
  submit() {
    var data = {
      emp_id: this.leave.getRawValue().empId,
      leave_type: this.leave.getRawValue().leaveType,

      no_of_days: this.leave.getRawValue().noOfDays,
      reason: this.leave.getRawValue().reason,
    };
    this.api.applyLeave(data).subscribe(
      (res) => {
        this.toastrService.success('', 'Leave Applied ', {
          positionClass: 'toast-top-right',
        });
        console.log('yes');
      },
      (error) => {
        this.toastrService.error('', error.error.error, {
          positionClass: 'toast-top-right',
        });
      }
    );
  }

  findId(e: any) {
    this.leave.controls.empId.valueChanges.subscribe((value: any) => {
      console.log('name-valueChange', value);
      var Id = value;
      console.log(Id);
      this.api.getEmployee_by_id(Id).subscribe(
        (res) => {
          var data = res;
          this.availableLeave = data;
          this.casualLeave = this.availableLeave.total_casual_leaves;
          this.wellnessLeave = this.availableLeave.total_wellness_leaves;
          this.leavecount = 'success';
        },
        (error) => {
          this.leavecount = 'error';
          if (error.error != null) {
            this.errorMessage = error.error;
            this.leavecount = 'errorMessage';
          }
          if ((error.error = null)) {
            this.leavecount = 'error';
          }
        }
      );
    });
  }
  Logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
