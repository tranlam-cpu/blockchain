import { Component, Output, EventEmitter,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductionForm } from '../type';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar , MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar'
import { FarmService } from '../service/farm.service';
@Component({
  selector: 'app-production-create-master',
  templateUrl: './production-create-master.component.html',
  styleUrls: ['./production-create-master.component.css']
})
export class ProductionCreateMasterComponent implements OnInit{
  url="";

  farms = this.fs.getFarmsBuyer();

  image:File;
  onselectFile(e:any){
    this.image=e.target.files[0];
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;

      }
    }
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  farmForm: FormGroup

  @Output() farmCreated: EventEmitter<ProductionForm> =new EventEmitter();

  constructor(private http: HttpClient,private fb: FormBuilder,private fs: FarmService,private snackBar:MatSnackBar){
    this.farmForm = this.fb.group({
      name: this.fb.control('',[Validators.required]),
      content: this.fb.control('',[Validators.required]),
      thumbnail: this.fb.control('',[Validators.required]),
      company: this.fb.control('',[Validators.required]),
      money: this.fb.control('',[Validators.required]),
      QR: this.fb.control('',[Validators.required]),
    });

    
  }

  ngOnInit(){
  
    this.fs.onEvent("ProductionCreated").subscribe(()=>{
      this.snackBar.open("Thêm thành công",'',{
        duration:1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      })
    });

  }


  submitForm(){

    const dataImage = new FormData();
    dataImage.append('image', this.image, this.image.name);
    
    this.http.post<any>('http://localhost:5000/upload', dataImage).subscribe(
      (response) => {
        console.log('Image uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );


    const formData: ProductionForm={
      name: this.farmForm.get("name")!.value,
      content: this.farmForm.get("content")!.value,
      thumbnail: this.image.name,
      company: this.farmForm.get("company")!.value,
      money: this.farmForm.get("money")!.value,
      QR: this.farmForm.get("QR")!.value,
    };


    this.farmCreated.emit(formData);
  }


}
