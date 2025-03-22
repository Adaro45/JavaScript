// src/types/Task.ts
export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string | null; // We'll store dates as strings in localStorage
    completed: boolean;
    createdAt: string;
  }