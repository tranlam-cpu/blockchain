import { Component, OnInit, Input } from '@angular/core';
import { Router  } from '@angular/router';
import { Farm } from '../type';
import { FarmService } from '../service/farm.service';
import { MatSnackBar , MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar'

@Component({
  selector: 'app-farm-list',
  templateUrl: './farm-list.component.html',
  styleUrls: ['./farm-list.component.css']
})
export class FarmListComponent implements OnInit{

  @Input() id: number;
  @Input() name: string;
  @Input() thumbnail: string;
  @Input() content: string;
  @Input() company: string;
  @Input() money: number;
  @Input() active: boolean;
  @Input() wallet: string;
  

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private router: Router,private fs: FarmService,private snackBar:MatSnackBar){}

  ngOnInit(){

    this.fs.onEvent("buyed").subscribe(()=>{
  
      this.snackBar.open("Thanh toán thành công",'',{
        duration:1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      })
    });
  }


  handleButton(){
    var type=localStorage.getItem("type");
    if(type=="1"){
      return false;
    }else return true;
  }

  getActive(){
    return this.active;
  }

  handleLinkDetail(){
    const farm: any={
      name: this.name,
      thumbnail: this.thumbnail,
      content: this.content,
      company: this.company,
      money: this.money
    }
    
    this.router.navigate(['/qr', { data: JSON.stringify(farm) }]);
    
  }

  buy(wallet:any,money:any,id:any){
    this.fs.buy(wallet,money,id);
  }
  

}
