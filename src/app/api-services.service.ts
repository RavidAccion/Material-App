import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiServicesService {
  constructor(private http: HttpClient) {}
  get_table_data() {
    return this.http.get('https://localhost:44356/api/store/get');
  }
  get_table_category() {
    return this.http.get('https://localhost:44356/api/category/get');
  }

  create_Store(data: any) {
    return this.http.post(
      'https://localhost:44356/api/store/createStore',
      data
    );
  }
  create_cat_Store(data: any) {
    return this.http.post('https://localhost:44356/api/catStore/create', data);
  }

  create_category(data: any) {
    return this.http.post('https://localhost:44356/api/category/create', data);
  }

  get_table_product() {
    return this.http.get('https://localhost:44356/api/ProductConroller/get');
  }
  delete_table_product(prodId: any) {
    return this.http.delete(
      `https://localhost:44356/api/ProductConroller/delete/${prodId}`
    );
  }
  edit_product(id: any, data: any) {
    return this.http.put(
      `https://localhost:44356/api/ProductConroller/edit/${id}`,
      data
    );
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
}
