// src/types/Task.ts
export interface Task {
    id: string
    title: string
    description: string
    dueDate: string | null
    completed: boolean
    createdAt: string
    priority?: "High" | "Medium" | "Low"
    category?: string
  }
  
  