import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../service/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {

  isProfileOpen = false; 

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen; 
  }

userName:string|null=""
email:string|null=""
profileimg:string|null=""
userId:string|null=""

  constructor (private route:ActivatedRoute,private userService:UserService){}

  ngOnInit():void{
    this.route.queryParamMap.subscribe(params => {
      this.userId = params.get("id");
      this.userName = params.get("username");
      this.email = params.get("email");
      this.profileimg = params.get("profileImage");
  
      console.log("User:", this.userName);
      console.log("Email:", this.email);
      console.log("Profile Image:", this.profileimg);
      });

  }

}
