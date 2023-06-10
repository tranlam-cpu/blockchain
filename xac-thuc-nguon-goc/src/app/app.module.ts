import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginService } from './service/login.service';
import { DataService } from './service/Data.service';
import { FarmService } from './service/farm.service';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FarmComponent } from './farm/farm.component';
import { FarmCreateComponent } from './farm-create/farm-create.component';
import { FarmListComponent } from './farm-list/farm-list.component';
import { QrComponent } from './qr/qr.component';
import { QRCodeModule } from 'angular2-qrcode';
import { KiemduyetComponent } from './kiemduyet/kiemduyet.component'
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductionComponent } from './production/production.component';
import { ProductionListComponent } from './production-list/production-list.component';
import { ProductionCreateComponent } from './production-create/production-create.component';
import { ProductionCreateMasterComponent } from './production-create-master/production-create-master.component';
import { ProductionProductComponent } from './production-product/production-product.component';
import { InformationComponent } from './information/information.component'
import { NgQrScannerModule } from 'angular2-qrscanner';
import { QrCheckComponent } from './qr-check/qr-check.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FarmComponent,
    FarmCreateComponent,
    FarmListComponent,
    QrComponent,
    KiemduyetComponent,
    ProductionComponent,
    ProductionListComponent,
    ProductionCreateComponent,
    ProductionCreateMasterComponent,
    ProductionProductComponent,
    QrCheckComponent,
    InformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule,
    NgxPaginationModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    NgQrScannerModule
  ],
  providers: [LoginService,FarmService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
