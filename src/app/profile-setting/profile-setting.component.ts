import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserInterface } from '../interfaces/User';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-profile-setting',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-setting.component.html',
  styleUrl: './profile-setting.component.css'
})
export class ProfileSettingComponent {
  userName: string | null = "";
  email: string | null = "";
  userId:string|null=""
  userImage: string | null = ""; // Store image as Base64
  

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get("username");
    this.email = this.route.snapshot.paramMap.get("email");
  
    if (this.userName) {
      this.userService.getUserByUsername(this.userName).subscribe(user => {
        if (user) {
          this.userId = user.id; // Store user ID
          this.userImage = user.profileImage ?? null;
        } else {
          console.error("User not found");
        }
      });
    }
  }
  
  

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.userImage = reader.result as string;
      };
    }
  }

  updateProfile() {
    if (!this.userId) {
      console.error("User ID not found");
      return;
    }
  
    const updatedData = {
      id: this.userId,
      username: this.userName,
      email: this.email,
      profileImage: this.userImage
    };
  
    this.userService.updateUserProfile(this.userName!, updatedData).subscribe(
      response => {
        console.log("Profile updated successfully", response);
        alert("Profile updated successfully!");
      },
      error => {
        console.error("Error updating profile", error);
        alert("Failed to update profile.");
      }
    );
  }
  
  
}