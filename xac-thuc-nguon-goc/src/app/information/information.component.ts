import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../service/Data.service';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {
  constructor(private dataService: DataService,private http: HttpClient){}


  img="localhost:5000/images/";
  name="";
  content="";
  company="";
  money="";

  fimg="localhost:5000/images/";
  fname="";
  fcontent="";
  fcompany="";
  fmoney="";


  
  ngOnInit():void {

    
    const ob:any=this.dataService.getData();
    
    console.log(ob);

    
     
      this.img+=ob.thumbnail;
      this.name=ob.name;
      this.content=ob.content;
      this.company=ob.company;
      this.money=ob.money;

      this.fimg+=ob.farmThumbnail
      this.fname=ob.farmName;
      this.fcontent=ob.farmcontent;
      this.fcompany=ob.farmCompany;
      this.fmoney=ob.farmMoney;
    

    
    

  }
}
