import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AuthserviceService } from './authservice.service';
import { RegistrationComponent } from './registration/registration.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { TableEditComponent } from './Dialog/table-edit/table-edit.component';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StoresComponent } from './stores/stores.component';
import { StoreComponent } from './Dialog/store/store.component';
import { MatCardModule } from '@angular/material/card';
import { TruncatePipe } from './truncate.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { EmployeeComponent } from './employee/employee.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    TruncatePipe,
    RegistrationComponent,
    TableEditComponent,
    StoresComponent,
    StoreComponent,
    EmployeeComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatTooltipModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-right',
    }),
    MatCardModule,

    MatGridListModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
    MatSortModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule,
    HttpClientModule,
    BrowserModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    ToastrModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    NgImageSliderModule,
  ],
  providers: [AuthserviceService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
