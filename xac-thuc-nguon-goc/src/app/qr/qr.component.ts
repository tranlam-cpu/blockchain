import { Component , OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { Farm } from '../type';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../service/Data.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit{


constructor(private dataService: DataService,private http: HttpClient,private location: Location,private router: Router,private route: ActivatedRoute){}

goBack(): void {
  this.location.back();
}

qrInfo="";
img="";
name="";
content="";
company="";
money="";
ngOnInit():void {

    // const data = this.route.snapshot.paramMap.get('data');
    const data:any=this.dataService.getData();
    const ob= JSON.parse(data as any)
    this.img=ob.thumbnail;
    this.name=ob.name;
    this.content=ob.content;
    this.company=ob.company;
    this.money=ob.money;
    // this.qrInfo=JSON.stringify(ob as any);
    
    var encoded = btoa(JSON.stringify(ob))
    this.qrInfo=encoded;
    var actual = JSON.parse(atob(encoded))
    console.log(encoded);
    console.log(actual);
  }

setLogout(){
    localStorage.removeItem('type');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  
}
