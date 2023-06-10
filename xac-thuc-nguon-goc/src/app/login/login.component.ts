import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;



  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService){
    
  }

  ngOnInit():void {
    this.loginForm = this.fb.group({
      user: this.fb.control('',[Validators.required]),
      password: this.fb.control('',[Validators.required]),   
    });

    var token=localStorage.getItem("token");
    if(token){
      this.router.navigate(['/home']);
    }

  }

  handleSubmit(){
    var formData = this.loginForm.value;
    var data= {
      user: formData.user,
      password: formData.password
    }

    this.loginService.login(data).subscribe((response:any)=>{
      localStorage.setItem('token',response.accessToken);
      localStorage.setItem('type',response.type);
      if(response.type=='4'){
        this.router.navigate(['/kiemduyet']);
      }else this.router.navigate(['/home']);
      
    },(error:any)=>{
      console.log(error.message);
    });
  }
}
