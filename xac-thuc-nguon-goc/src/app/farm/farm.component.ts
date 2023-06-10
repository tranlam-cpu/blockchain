import { Component } from '@angular/core';
import { Farm, FarmForm } from '../type';
import { FarmService } from '../service/farm.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router , ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent {
  showForm= false;
  showList = true;



  goBack(): void {
    this.location.back();
  }

  setLogout(){
    localStorage.removeItem('type');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }


  farms = this.fs.getFarms();

 

  constructor(private fs: FarmService,private http: HttpClient,private location: Location,private router: Router){
    
  }

  

  ngOnInit(){

   
   

  }

  handleFarmCreate(farm: FarmForm){
    this.fs.createFarm(farm);
  }
}
