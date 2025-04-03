import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../interfaces/Task';

@Component({
  selector: 'app-tasks',
  imports: [NgFor],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  projectId: string | null = null;
  tasks: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const projectTitle = this.route.snapshot.paramMap.get("title"); // Get project title from URL
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    console.log("Project Title from URL:", this.route.snapshot.paramMap.get("title"));

    const project = projects.find((p: { title: string }) => p.title === projectTitle);

    
    if (project && project.tasks) {
      this.tasks = project.tasks;
    } else {
      console.error("No tasks found for this project!");
    }
  }
  
  }
  
