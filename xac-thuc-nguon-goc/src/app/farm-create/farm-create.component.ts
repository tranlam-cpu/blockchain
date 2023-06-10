import { Component, Output, EventEmitter,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FarmForm } from '../type';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar , MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar'
import { FarmService } from '../service/farm.service';
@Component({
  selector: 'app-farm-create',
  templateUrl: './farm-create.component.html',
  styleUrls: ['./farm-create.component.css']
})
export class FarmCreateComponent implements OnInit{
  url="";

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


  farmForm: FormGroup;

  @Output() farmCreated: EventEmitter<FarmForm> =new EventEmitter();

  constructor(private http: HttpClient,private fb: FormBuilder,private fs: FarmService,private snackBar:MatSnackBar){
    this.farmForm = this.fb.group({
      name: this.fb.control('',[Validators.required]),
      content: this.fb.control('',[Validators.required]),
      thumbnail: this.fb.control('',[Validators.required]),
      company: this.fb.control('',[Validators.required]),
      money: this.fb.control('',[Validators.required]),
    });

    
  }

  ngOnInit(){
  
    this.fs.onEvent("FarmCreated").subscribe(()=>{
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


    const formData: FarmForm={
      name: this.farmForm.get("name")!.value,
      content: this.farmForm.get("content")!.value,
      thumbnail: this.image.name,
      company: this.farmForm.get("company")!.value,
      money: this.farmForm.get("money")!.value,
    };

    this.farmCreated.emit(formData);
  }



}
