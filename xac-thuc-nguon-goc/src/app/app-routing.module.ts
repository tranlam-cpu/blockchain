import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FarmComponent } from './farm/farm.component';
import { ProductionComponent } from './production/production.component';
import { QrComponent } from './qr/qr.component';
import { QrCheckComponent } from './qr-check/qr-check.component';
import { KiemduyetComponent } from './kiemduyet/kiemduyet.component';
import { InformationComponent } from './information/information.component';
const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home',component: HomeComponent},
  { path: 'farm',component: FarmComponent},
  { path: 'production',component: ProductionComponent},
  { path: 'qr',component: QrComponent},
  { path: 'qr-check',component: QrCheckComponent},
  { path: 'kiemduyet',component: KiemduyetComponent},
  { path: 'info',component: InformationComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
