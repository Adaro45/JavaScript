// src/services/storageService.ts
import { Task } from '../types/Task';

// Key for storing tasks in localStorage
const TASKS_STORAGE_KEY = 'taskManager_tasks';

// Save tasks to localStorage
export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};

// Get tasks from localStorage
export const getTasks = (): Task[] => {
  const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY);
  if (!tasksJson) return [];
  
  try {
    return JSON.parse(tasksJson) as Task[];
  } catch (error) {
    console.error('Error parsing tasks from localStorage:', error);
    return [];
  }
};

// Add a new task
export const addTask = (task: Task): Task[] => {
  const tasks = getTasks();
  const updatedTasks = [...tasks, task];
  saveTasks(updatedTasks);
  return updatedTasks;
};

// Delete a task
export const deleteTask = (taskId: string): Task[] => {
  const tasks = getTasks();
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  saveTasks(updatedTasks);
  return updatedTasks;
};

// Toggle task completion status
export const toggleTaskCompletion = (taskId: string): Task[] => {
  const tasks = getTasks();
  const updatedTasks = tasks.map(task => 
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  saveTasks(updatedTasks);
  return updatedTasks;
};