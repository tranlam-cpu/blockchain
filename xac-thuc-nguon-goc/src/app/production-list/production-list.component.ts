import { Component, OnInit, Input } from '@angular/core';
import { Farm } from '../type';
import { FarmService } from '../service/farm.service';
import { DataService } from '../service/Data.service';
import { Router  } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-production-list',
  templateUrl: './production-list.component.html',
  styleUrls: ['./production-list.component.css']
})
export class ProductionListComponent implements OnInit{

  constructor(private dataService: DataService,private http: HttpClient,private router: Router,private fs: FarmService){}




  ngOnInit():void {
    

    this.fs.getFarmsBuyer().then((response:any)=>{
      this.farms=response;      
    })
    
    this.fs.onEvent("setActived").subscribe(()=>{
      this.fs.getFarmsBuyer().then((response:any)=>{
        this.farms=response;       
      })
     
    });
 
  }

  farms: Farm[] = [];

  name:any;
  p: number=1;

 

  Search(){
    if(this.name==""){
      this.ngOnInit();
    }else{
      this.farms=this.farms.filter((res:any)=>{
        
        return res.name.match(this.name);
      })

    }
  }


  handleLinkDetail(name:any,company:any,content:any,money:any,thumbnail:any){
    const farm: any={
      name: name,
      thumbnail: thumbnail,
      content: content,
      company: company,
      money: money
    }
    this.dataService.setData(JSON.stringify(farm));
    this.router.navigate(['/qr']);
    // this.router.navigate(['/qr', { data: JSON.stringify(farm) }]);

     // this.http.post('qr', JSON.stringify(farm)).subscribe(response => {
    //   this.router.navigate(['/qr', { data: JSON.stringify(farm) }]);
    // }, error => {
    //   console.log("fail");
    // });
    
  }

}
