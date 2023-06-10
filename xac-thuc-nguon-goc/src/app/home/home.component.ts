import { Component , OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { Farm } from '../type';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private router: Router,private route: ActivatedRoute){}


 

  ngOnInit():void {
    var type=localStorage.getItem("type");
    if(type=='4'){
      this.router.navigate(['/kiemduyet']);
    }

    // const data = this.route.snapshot.paramMap.get('data');

    // const ob= JSON.parse(data as any)
    // console.log(ob);
  }

  
}
