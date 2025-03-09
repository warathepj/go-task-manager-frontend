export interface Task {
  id: string;
  description: string;
  deadline: string;
  timeRequired: string;
  priority: string;
  urgency: number;
  dependencies: string[];
  resources: string[];
  subtasks: string[];
  group?: string;
}  
