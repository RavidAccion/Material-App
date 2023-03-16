import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiServicesService {
  url: any = 'https://localhost:44356';
  employeeurl: any = 'https://localhost:7097';
  constructor(private http: HttpClient) {}
  get_table_data() {
    return this.http.get(this.url + '/api/store/get');
  }

  get_table_category() {
    return this.http.get(this.url + '/api/category/get');
  }

  create_Store(data: any) {
    return this.http.post(this.url + '/api/store/createStore', data);
  }

  create_cat_Store(data: any) {
    return this.http.post(this.url + '/api/catStore/create', data);
  }

  create_category(data: any) {
    return this.http.post(this.url + '/api/category/create', data);
  }

  get_table_product() {
    return this.http.get(this.url + '/api/ProductConroller/get');
  }

  delete_table_product(prodId: any) {
    return this.http.delete(
      this.url + `/api/ProductConroller/delete/${prodId}`
    );
  }

  edit_product(id: any, data: any) {
    return this.http.put(this.url + `/api/ProductConroller/edit/${id}`, data);
  }
  addProduct(data: any) {
    return this.http.post(
      'https://localhost:44356/api/ProductConroller/createProduct',
      data
    );
  }
  addProductCat(data: any) {
    return this.http.post(
      'https://localhost:44356/api/ProductCat/create',
      data
    );
  }

  //employee
  get_leavelist_data() {
    return this.http.get(this.employeeurl + '/api/leave/Getleavelist');
  }
  getEmployeeData() {
    return this.http.get(this.employeeurl + '/api/employee/get');
  }
  getEmployee_by_id(Id: any) {
    return this.http.get(
      this.employeeurl + `/api/employee/getemployeeID/${Id}`
    );
  }
  applyLeave(data: any) {
    return this.http.post(this.employeeurl + '/api/leave/applyleave', data);
  }
}
