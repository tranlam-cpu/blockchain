import { Component, OnInit, Input } from '@angular/core';
import { Production } from '../type';
import { FarmService } from '../service/farm.service';
import { DataService } from '../service/Data.service';
import { Router  } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-production-product',
  templateUrl: './production-product.component.html',
  styleUrls: ['./production-product.component.css']
})
export class ProductionProductComponent implements OnInit {
  constructor(private dataService: DataService,private http: HttpClient,private router: Router,private fs: FarmService){}

 
  ngOnInit():void {
    

    this.fs.getProductions().then((response:any)=>{
      this.farms=response;      
    })
    
    this.fs.onEvent("setActived").subscribe(()=>{
      this.fs.getProductions().then((response:any)=>{
        this.farms=response;       
      })
     
    });
 
  }

  farms: Production[] = [];

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


  handleLinkDetail(name:any,company:any,content:any,money:any,thumbnail:any,QR:any){

    var actual = JSON.parse(atob(QR))

    const production: any={
      name: name,
      thumbnail: thumbnail,
      content: content,
      company: company,
      money: money,
      farmName: actual.name,
      farmThumbnail: actual.thumbnail,
      farmContent: actual.content,
      farmCompany: actual.company,
      farmMoney: actual.money,
    }

 
    
    this.dataService.setData(JSON.stringify(production));
    this.router.navigate(['/qr']);

   
    
  }

}
