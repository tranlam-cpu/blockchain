import { Component } from '@angular/core';
import { Production, ProductionForm } from '../type';
import { FarmService } from '../service/farm.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent {
  showForm= false;
  showList = true;
  showProduct = false;

  goBack(): void {
    this.location.back();
  }

  setLogout(){
    localStorage.removeItem('type');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  constructor(private fs: FarmService,private http: HttpClient,private location: Location,private router: Router){
    
  }

  handleFarmCreate(production: ProductionForm){
    this.fs.createProduction(production);
  }
}
