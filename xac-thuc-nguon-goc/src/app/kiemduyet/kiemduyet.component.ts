import { Component , OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { FarmService } from '../service/farm.service';
import { Farm  } from '../type';
import { MatSnackBar , MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar'

@Component({
  selector: 'app-kiemduyet',
  templateUrl: './kiemduyet.component.html',
  styleUrls: ['./kiemduyet.component.css']
})
export class KiemduyetComponent implements OnInit{
  constructor(private router: Router,private fs: FarmService,private snackBar:MatSnackBar){}

   ngOnInit():void {
    var type=localStorage.getItem("type");
    if(type!='4'){
      this.router.navigate(['/home']);
    }

    this.fs.getFarms().then((response:any)=>{
      console.log(response);
        this.farms=response;   
      
    })
    
    this.fs.onEvent("setActived").subscribe(()=>{
      this.fs.getFarms().then((response:any)=>{
        this.farms=response;       
      })
      this.snackBar.open("Kiểm định thành công",'',{
        duration:1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      })
    });
 
  }

  farms: Farm[] = [];

  name:any;
  p: number=1;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  Search(){
    if(this.name==""){
      this.ngOnInit();
    }else{
      this.farms=this.farms.filter((res:any)=>{
        
        return res.name.match(this.name);
      })

    }
  }


  


  submitForm(data:any){    
    this.fs.setActive(data as any);


    
    
  }
}
