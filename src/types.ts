export interface Task {
    id: string;
    description: string;
    deadline: string;
    timeRequired: string;
    priority: 'High' | 'Medium' | 'Low';
    urgency: number;
    dependencies: string[];
    resources: string[];
    subtasks: string[];
    group?: string;
  }
  