export interface Task {
    title: string;
    assignedTo: string;
    status: 'High' | 'Medium' | 'Low';
    estimate: string;
    timeSpent: string;
    projectId: string; // This links the task to a specific project
  }