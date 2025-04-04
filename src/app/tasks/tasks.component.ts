import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../interfaces/Task';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { title } from 'process';

@Component({
  selector: 'app-tasks',
  imports: [NgFor,NgClass,FormsModule,NgIf],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  projectTitle: string|null=''
  editingTaskIndex: number | null = null;
  projectId: string | null = null;
  addTask: FormGroup;
  
  confirmDelete=''
  tasks: any[] = [];
  newTask: any = {
    title: '',
    assignedTo: '',
    status: 'Pending',
    assignedUser: '',
    estimate: '',
    timeSpent: ''
  };
  constructor(private route: ActivatedRoute,private fb: FormBuilder) {
    this.addTask = this.fb.group({
      title: ['', Validators.required],
      assignedTo: ['', Validators.required],
      status: ['', Validators.required],
      assignedUser: ['', Validators.required],
      estimate: ['', Validators.required],
      timeSpent: ['', Validators.required],
     
    });

  }

  ngOnInit() {
    this.projectTitle = this.route.snapshot.paramMap.get("title"); // Get project title from URL
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    console.log("Project Title from URL:", this.route.snapshot.paramMap.get("title"));

    const project = projects.find((p: { title: string }) => p.title === this.projectTitle);

    
    if (project && project.tasks) {
      this.tasks = project.tasks;
    } else {
      console.error("No tasks found for this project!");

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
  
  editTask(index: number) {
    this.editingTaskIndex = index;
    this.newTask = { ...this.tasks[index] }; // Copy task data into form
  
    const modal = document.getElementById('taskModal');
    if (modal) {
      (modal as any).classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }
  addOrUpdateTask() {
    if(this.addTask.valid){
    if (this.editingTaskIndex !== null) {
      // Update task
      this.tasks[this.editingTaskIndex] = { ...this.newTask };
    } else {
      // Add task
      this.tasks.push({ ...this.newTask });
    }
  
    // Update localStorage
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const project = projects.find((p: any) => p.title === this.projectTitle);
    if (project) {
      project.tasks = this.tasks;
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  
    // Reset
    this.newTask = {
      title: '',
      assignedTo: '',
      status: 'Pending',
      assignedUser: '',
      estimate: '',
      timeSpent: ''
    };
    this.editingTaskIndex = null;
    this.closeTaskForm();
  }else{
    this.addTask.markAllAsTouched();
  }
  }
  
  
  openTaskForm(index: number) {
    this.editingTaskIndex= index; // Set selected project index
    this.newTask = { title: '', assignedTo: '', status: 'In Progress', assignedUser: '', estimate: '', timeSpent: '' };
  
    // Open Bootstrap modal with smooth effect
    const modal = document.getElementById('taskModal');
    if (modal) {
      (modal as any).classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }
  deleteTask(index: number) {
    console.log('Deleting task at index:', index);
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      const projects = JSON.parse(localStorage.getItem("projects") || "[]");
      const project = projects.find((p: any) => p.title === this.projectTitle);
  
      if (project && project.tasks) {
        project.tasks.splice(index, 1); // Remove from localStorage
        this.tasks.splice(index, 1);    // Remove from displayed list
  
        localStorage.setItem("projects", JSON.stringify(projects));
      }
    }
  }
  
  
  }
  
