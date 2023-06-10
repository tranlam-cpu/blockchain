import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-production-create',
  templateUrl: './production-create.component.html',
  styleUrls: ['./production-create.component.css']
})
export class ProductionCreateComponent implements OnInit{

  @Input() name: string;
  @Input() thumbnail: string;
  @Input() content: string;
  @Input() company: string;
  @Input() money: number;
  @Input() formGroup: FormGroup;
  
  farm:any;




  ngOnInit(){

    const ob: any={
      name: this.name,
      thumbnail: this.thumbnail,
      content: this.content,
      company: this.company,
      money: this.money
    }

    this.farm = btoa(JSON.stringify(ob));
  }
}
