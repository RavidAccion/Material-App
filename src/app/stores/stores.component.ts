import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicesService } from '../api-services.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StoreComponent } from '.././Dialog/store/store.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent {
  displayedColumns = ['Store_Id', 'Store_name'];
  displayedColumns1 = ['id', 'Category'];
  displayedColumns2 = [
    'S.No',
    'id',
    'Product',
    'Description',
    'price',
    'brand',
    'quantity',
    'Actions',
  ];
  @ViewChild('paginator')
  paginator!: MatPaginator;
  dataSource: any = {};
  categoryData: any;
  name: any;
  formId: any;
  productData: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private api: ApiServicesService
  ) {}

  ngOnInit() {
    this.get_table_data();
  }

  //to get datas from database for store and category table
  get_table_data() {
    var _userName = sessionStorage.getItem('userName');
    this.name = JSON.parse(_userName || '');
    this.api.get_table_data().subscribe((res) => {
      const data = res;
      this.dataSource = data;
    });
    this.api.get_table_category().subscribe((res) => {
      const data = res;
      this.categoryData = data;
    });
    this.api.get_table_product().subscribe((res) => {
      const data = res;
      this.productData = data;
      console.log(data);
    });
  }

  //to open create dialog and to create new store
  create_dialog(): void {
    this.formId = 1;
    sessionStorage.setItem('formId', this.formId);
    const dialogRef = this.dialog.open(StoreComponent, {
      width: '350px',
      height: '250px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res.data.istore_Named.value);
      var _name = res.data.istore_Named.value;
      var data = {
        store_Name: _name,
      };
      this.api.create_Store(data).subscribe((res) => {
        console.log('data response1', res);
        this.toastrService.success('', ' Store Created Successfully!', {
          positionClass: 'toast-top-right',
        });
        this.ngOnInit();
      });
    });
  }

  //to open register store dialog and get back the datas from it
  create_CatStore_dialog(): void {
    this.formId = 2;
    sessionStorage.setItem('formId', this.formId);
    const dialogRef = this.dialog.open(StoreComponent, {
      width: '350px',
      height: '350px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      var data = {
        store_id: res.data.store_id.value,
        category_id: res.data.category_id.value,
      };
      console.log(data);
      this.api.create_cat_Store(data).subscribe((res) => {
        console.log('data response Cat Store', res);
        this.toastrService.success('', ' Store Registered Successfully!', {
          positionClass: 'toast-top-right',
        });
        this.ngOnInit();
      });
    });
  }

  //to add product  and get back the datas from it using mat dialog
  addProduct_dialog(): void {
    this.formId = 3;
    sessionStorage.setItem('formId', this.formId);
    const dialogRef = this.dialog.open(StoreComponent, {
      width: '350px',
      height: '400px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      var data = {
        product_Name: res.data.product_Name.value,
        brand: res.data.brand.value,
        price: res.data.price.value,
        quantity: res.data.quantity.value,
        product_description: res.data.product_description.value,
      };

      this.api.addProduct(data).subscribe((res) => {
        console.log('data response Cat Store', res);
        this.toastrService.success('', ' Product Added Successfully!', {
          positionClass: 'toast-top-right',
        });
        this.ngOnInit();
      });
    });
  }

  //to open register product and get back the datas from it
  create_productCat_dialog(): void {
    this.formId = 4;
    sessionStorage.setItem('formId', this.formId);
    const dialogRef = this.dialog.open(StoreComponent, {
      width: '350px',
      height: '350px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      var data = {
        product_id: res.data.product_id.value,
        category_id: res.data.category_id.value,
      };
      console.log(res);
      this.api.addProductCat(data).subscribe((res) => {
        console.log('data response Cat Store', res);
        this.toastrService.success(
          '',
          ' Updated Successfully in Mapping Table',
          {
            positionClass: 'toast-top-right',
          }
        );
      });
    });
  }
  //method to create a new category
  create_Category(): void {
    this.formId = 5;
    sessionStorage.setItem('formId', this.formId);
    const dialogRef = this.dialog.open(StoreComponent, {
      width: '350px',
      height: '250px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res.data.category_Name.value);
      var data = {
        category_Name: res.data.category_Name.value,
      };
      this.api.create_category(data).subscribe((res) => {
        console.log('data response1', res);
        this.toastrService.success('', ' Category Created Successfully!', {
          positionClass: 'toast-top-right',
        });
        this.ngOnInit();
      });
    });
  }

  Delete_Product(element: any) {
    console.log(element);
    var prodId = element.id;
    this.api.delete_table_product(prodId).subscribe((res) => {
      console.log('data response1', res);
      this.toastrService.success('', ' Product Deleted Successfully!', {
        positionClass: 'toast-top-right',
      });
      this.ngOnInit();
    });
  }
  //method to edit products
  edit_Product(element: any) {
    this.formId = 3;
    sessionStorage.setItem('formId', this.formId);
    const dialogRef = this.dialog.open(StoreComponent, {
      width: '350px',
      height: '400px',
      data: {
        product_Name: element.product_Name,
        price: element.price,
        brand: element.brand,
        quantity: element.quantity,
        product_description: element.product_description,
        form: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      var id = element.id;
      var data = {
        id: element.id,
        product_Name: res.data.product_Name.value,
        price: res.data.price.value,
        brand: res.data.brand.value,
        quantity: res.data.quantity.value,
        product_description: res.data.product_description.value,
      };
      this.api.edit_product(id, data).subscribe((res) => {
        console.log('data response1', res);
        this.ngOnInit();
        this.toastrService.success('', ' Product Updated Successfully!', {
          positionClass: 'toast-top-right',
        });
      });
    });
  }

  //logout method
  Logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
