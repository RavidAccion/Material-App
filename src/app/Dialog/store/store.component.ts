import { Component, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiServicesService } from '../../api-services.service';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent {
  formId: any;
  form: any = FormGroup;
  catform: any = FormGroup;
  addProduct: any = FormGroup;
  ProductCat: any = FormGroup;
  Categoryform: any = FormGroup;
  dataSource: any;
  categoryData: any;
  productData: any;
  type: any;
  constructor(
    private fb: FormBuilder,
    private api: ApiServicesService,
    public dialogRef: MatDialogRef<StoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = []
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.get_formId();
    this.get_table_data();
    this.FormBuild();
    this.catFormBuild();
    this.productFormBuild();
    this.productCatFormBuild();
    this.categoryFormBuild();
  }

  /* Method to build the form (store create) group for get  informations */
  FormBuild(): void {
    this.form = this.fb.group({
      id: '',
      name: ['', [Validators.required]],
    });
  }
  /* Method to build the form (Categorycreate) group for get  informations */
  categoryFormBuild(): void {
    this.Categoryform = this.fb.group({
      category_Name: ['', [Validators.required]],
    });
  }
  /* Method to build the form (store register) group for get  informations */
  catFormBuild(): void {
    this.catform = this.fb.group({
      store_id: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
    });
  }
  productFormBuild(): void {
    this.addProduct = this.fb.group({
      product_Name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      product_description: ['', [Validators.required]],
    });
    this.addProduct.patchValue(this.data);
    this.type = this.data.form;
    console.log(this.type);
  }

  productCatFormBuild(): void {
    this.ProductCat = this.fb.group({
      product_id: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
    });
  }

  /*to get the datas needed for dropdown in register form*/
  get_table_data() {
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

  /*to get the form id (formid 1=create store form , formid 2=register store form......*/
  get_formId() {
    this.formId = sessionStorage.getItem('formId');
  }
  /*to submit create form*/
  submit() {
    console.log('yes 1');
    this.dialogRef.close({
      data: {
        istore_Named: this.form.get('name'),
      },
    });
  }

  /*to submit category form*/
  saveCategory() {
    console.log(this.Categoryform.value);
    this.dialogRef.close({
      data: {
        category_Name: this.Categoryform.get('category_Name'),
      },
    });
  }
  /*to submit register store form*/
  submitcatForm() {
    console.log('yes 2');
    this.dialogRef.close({
      data: {
        store_id: this.catform.get('store_id'),
        category_id: this.catform.get('category_id'),
      },
    });
  }
  /*to submit product form*/
  submitProductForm() {
    console.log(this.addProduct.value);
    this.dialogRef.close({
      data: {
        product_Name: this.addProduct.get('product_Name'),
        price: this.addProduct.get('price'),
        brand: this.addProduct.get('brand'),
        quantity: this.addProduct.get('quantity'),
        product_description: this.addProduct.get('product_description'),
      },
    });
  }

  /*to submit productcategory store form*/
  submitProdCatForm() {
    this.dialogRef.close({
      data: {
        product_id: this.ProductCat.get('product_id'),
        category_id: this.ProductCat.get('category_id'),
      },
    });
  }
}
