import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterEvent, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-project',
  imports: [ReactiveFormsModule,RouterLink,NgFor],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {
  projectForm: FormGroup;
  projects: any[] = []; // Store multiple projects
  constructor(private fb: FormBuilder) {
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
    if (this.projectForm.valid) {
      const projectData = this.projectForm.value;
      this.projects.push(projectData); // Add new project to the list

      // Save updated projects list to local storage
      localStorage.setItem('projects', JSON.stringify(this.projects));

      alert('Project added successfully!');
      this.projectForm.reset(); // Clear form
    }
  }


  loadProjects() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      this.projects = JSON.parse(storedProjects); // Load existing projects
    }
  }


}