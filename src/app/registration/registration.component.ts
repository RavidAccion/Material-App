import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiServicesService } from '.././api-services.service';
import { TableEditComponent } from '.././Dialog/table-edit/table-edit.component';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  displayedColumns = ['Id', 'first name', 'last name', 'email', 'Actions'];
  search: any = new FormControl('');
  value: any;
  userData: any;
  receivedData: any = [];
  userName: any;
  tableData = [
    {
      id: 1,
      email: 'ravid@gmail.com',
      first_name: 'Ravid',
      last_name: 'RV',
    },
    {
      id: 2,
      email: 'hrithik@gmail.com',
      first_name: 'nithin',
      last_name: 'raj',
    },
    {
      id: 3,
      email: 'niki@gmail.com',
      first_name: 'nikitha',
      last_name: 'isaac',
    },
    {
      id: 4,
      email: 'alexa@gmail.com',
      first_name: 'alexa',
      last_name: 'exa',
    },
  ];
  dataSource = new MatTableDataSource(this.tableData);
  @ViewChild(MatSort)
  sort: any = MatSort;
  name: any;
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private api: ApiServicesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.get_table_data();
    this.dataSource.sort = this.sort;
  }

  /* this method is to get user datas from Session*/
  get_table_data() {
    // localStorage.setItem('Data', JSON.stringify(this.tableData));

    this.userName = sessionStorage.getItem('userName');
    this.name = JSON.parse(this.userName);
    console.log(this.name);

    const data = localStorage.getItem('Data');
    this.tableData = JSON.parse(data || '{}');
  }

  /*this method is to open the edit dialog box and its passing the data to the dilog */
  showPrompt(user_data: any): void {
    const dialogRef = this.dialog.open(TableEditComponent, {
      width: '350px',
      height: '400px',
      data: {
        id: user_data.id,
        first_name: user_data.first_name,
        last_name: user_data.last_name,
        email: user_data.email,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.receivedData = res.data;
      var editData = {
        id: this.receivedData.id.value,
        email: this.receivedData.email.value,
        first_name: this.receivedData.first_name.value,
        last_name: this.receivedData.last_name.value,
      };

      //below is to edit the datas
      const test = [...this.tableData, editData];
      const index = test.findIndex((x) => x.id === editData.id);
      (test[index].email = editData.email),
        (test[index].first_name = editData.first_name),
        (test[index].last_name = editData.last_name);
    });
  }

  /*this method is to open the create dialog box  */
  create_dialog(): void {
    const dialogRef = this.dialog.open(TableEditComponent, {
      width: '350px',
      height: '400px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.receivedData = res.data;
      var edit_data = {
        id: this.tableData.length + 1,
        email: this.receivedData.email.value,
        first_name: this.receivedData.first_name.value,
        last_name: this.receivedData.last_name.value,
      };

      this.tableData = [...this.tableData, edit_data];
      localStorage.setItem('Data', JSON.stringify(this.tableData));
    });
  }

  /*this method is to delete the user*/
  Delete_Dialog(data: any) {
    console.log(data.id);
    var id = data.id;
    const deldata = [...this.tableData];
    const index = deldata.findIndex((x) => x.id === data.id);
    // delete this.tableData[index];
    this.tableData.splice(index, 1);
    this.toastrService.success('Message Success!', 'Title Success!', {
      positionClass: 'toast-top-center',
    });
    this.tableData = [...this.tableData];
    localStorage.setItem('Data', JSON.stringify(this.tableData));
  }

  /*method for search filter */
  applyFilter() {
    console.log(this.search);
    this.search.valueChanges.subscribe((data: any) => {
      console.log(data);
      var _dataSource = new MatTableDataSource(this.tableData);
      var filterValue = data;
      _dataSource.filter = filterValue.trim().toLowerCase();
      this.tableData = _dataSource.filteredData;
    });
  }

  /*this method is to reset the table datas*/
  reset() {
    this.get_table_data();
  }

  /*this method is to log out from the application */
  Logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
