import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'xac-thuc-nguon-goc';

  constructor(private router: Router){}

  ngOnInit():void {
    var token=localStorage.getItem("token");
    if(!token){
      this.router.navigate(['/']); 
    }
  }
  
}
