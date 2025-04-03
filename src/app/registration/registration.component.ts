import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserInterface } from '../interfaces/User';


@Component({
  selector: 'app-registration',
  imports: [NgIf,ReactiveFormsModule,RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {


 signUpForm!: FormGroup;
 user:UserInterface[]=[];

  constructor(private fb: FormBuilder, private router:Router,private userService:UserService) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]], // username field with required validation
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]  // password field with required validation
    
       
    });

    this.getUser()
    
  

  }
 //getting api
  getUser(){
     
    this.userService.getUser().subscribe((data:UserInterface[])=>{
      console.log(data)
      this.user=data

  } )
  }
  onSubmit(): void {
    if (this.signUpForm.valid) {
      const formValues: UserInterface = this.signUpForm.value;
  
      this.userService.saveUser(formValues).subscribe(
        (data: UserInterface) => {
          console.log('User saved:', data);
          this.router.navigate(["/login"]);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.log('Form is not valid');
    }

    this.getUser()
  
  }

 
}

