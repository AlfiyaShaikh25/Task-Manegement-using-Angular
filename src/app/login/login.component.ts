import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router } from '@angular/router'; 
import { UserInterface } from '../interfaces/User';

@Component({
  selector: 'app-login',
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 

 
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], 
      password: ['', [Validators.required]]  
    });
  }

  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      console.log('Login Successful', formValues);
      this.router.navigate(["/dashboard"])
      
    } else {
      console.log('Form is not valid');
    }
    
  }
}