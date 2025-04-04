import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterEvent, RouterLink } from '@angular/router';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  imports: [ReactiveFormsModule, RouterLink, NgFor, NgIf, NavBarComponent],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {
  projectForm: FormGroup;
  projects: any[] = []; // Store multiple projects
  submitted = false;



  constructor(private fb: FormBuilder,private router:Router) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      createdBy: ['', Validators.required],
      projectManager: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      teamMembers: ['', Validators.required],
      dueDate: ['', Validators.required]
    });

    this.loadProjects();
  }

  
  onSubmit() {
    this.submitted = true;
    if (this.projectForm.invalid) {
      return;
    }
    else  {
      const projectData = this.projectForm.value;
      this.projects.push(projectData); // Add new project to the list

      // Save updated projects list to local storage
      localStorage.setItem('projects', JSON.stringify(this.projects));

      console.log('Project added successfully!');
      this.projectForm.reset(); // Clear form
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 0);
    }
  }


  loadProjects() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      this.projects = JSON.parse(storedProjects); // Load existing projects
    }
  }


}