import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; 
import { UserInterface } from '../interfaces/User';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-login',
  imports: [NgIf,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 

 
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router:Router, private userService:UserService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], 
      password: ['', [Validators.required]]  
    });
  }

  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
  
      this.userService.loginUser(username, password).subscribe(user => {
        if (user) {
          console.log('Login successful:', user);
          
          this.router.navigate(['/dashboard'], { 
            queryParams: { 
              id: user.id, 
              username: user.username, 
              email: user.email, 
              profileImage: user.profileImage 
            } 
          });

        } else {
          console.error('Invalid username or password');
          alert('Invalid credentials, please try again.');
        }
      }, error => {
        console.error('Error:', error);
       
      });
    } else {
      console.log('Form is not valid');
    }
    
  }


}