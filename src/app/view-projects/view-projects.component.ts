import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-projects',
  imports: [NgFor,NgIf,FormsModule,RouterLink],
  templateUrl: './view-projects.component.html',
  styleUrl: './view-projects.component.css'
})
export class ViewProjectsComponent {
  projects: any[] = [];
  showTaskForm: boolean = false;
  selectedProjectIndex: number | null = null;
  newTask: any = {
    title: '',
    assignedTo: '',
    status: 'Medium',
    assignedUser: '',
    estimate: '',
    timeSpent: ''
  };

  constructor() {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      this.projects = JSON.parse(storedProjects);
    } else {
      this.projects = []; // Initialize as empty if no projects exist
    }
  }

  openTaskForm(index: number) {
    this.selectedProjectIndex = index; // Set selected project index
    this.newTask = { title: '', assignedTo: '', status: 'Medium', assignedUser: '', estimate: '', timeSpent: '' };
  
    // Open Bootstrap modal with smooth effect
    const modal = document.getElementById('taskModal');
    if (modal) {
      (modal as any).classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  addTask() {
    if (this.selectedProjectIndex !== null) {
      // Get the project
      let project = this.projects[this.selectedProjectIndex];
  
      // Ensure the project has a 'tasks' array
      if (!project.tasks) {
        project.tasks = [];
      }
  
      // Add the new task
      project.tasks.push({ ...this.newTask });
  
      // Update local storage without removing projects
      localStorage.setItem('projects', JSON.stringify(this.projects));
  
      // Reset task form fields
      this.newTask = { title: '', assignedTo: '', status: 'Medium', assignedUser: '', estimate: '', timeSpent: '' };
  
      // Close the modal
      this.closeTaskForm();
  
      // Reload projects to reflect changes
      this.loadProjects();
    }
  }
  
  deleteProject(index: number) {
    if (confirm("Are you sure you want to delete this project?")) {
      this.projects.splice(index, 1);
      localStorage.setItem('projects', JSON.stringify(this.projects)); // Update storage
    }
  }

  closeTaskForm() {
    const modal = document.getElementById('taskModal');
    if (modal) {
      (modal as any).classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }
}