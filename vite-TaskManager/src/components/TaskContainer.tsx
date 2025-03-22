// src/components/TaskContainer.tsx
import React, { useState, useEffect } from "react";
import "./styles/TaskContainer.css";
import Card from "./Card";
import "react-datepicker/dist/react-datepicker.css";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types/Task';
import { getTasks, addTask, deleteTask, toggleTaskCompletion } from '../services/storageService';
import { useTheme } from '../contexts/ThemeContext';

const TaskContainer: React.FC = () => {
  // Get the dark mode state from our theme context
  const { darkMode } = useTheme();

  // Create a Material UI theme based on our dark mode state
  const muiTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#FF6107',
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#3d3d3d' : '#ffffff',
          }
        }
      }
    }
  });

  // State management
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = getTasks();
    setTasks(savedTasks);
  }, []);

  // Handler for task completion toggle
  const handleCompleteTask = (taskId: string) => {
    const updatedTasks = toggleTaskCompletion(taskId);
    setTasks(updatedTasks);
  };

  // Handler for task deletion
  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = deleteTask(taskId);
    setTasks(updatedTasks);
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least title is provided
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }
    
    // Create a new task object
    const newTask: Task = {
      id: uuidv4(), // Generate a unique ID
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate ? dueDate.toISOString() : null,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    // Add the task to localStorage and update state
    const updatedTasks = addTask(newTask);
    setTasks(updatedTasks);
    
    // Reset form fields
    setTitle('');
    setDescription('');
    setDueDate(null);
  };

  return (
    <div className="task-container">
      <div className="task-list">
        <h2>Tasks:</h2>
        {tasks.length === 0 ? (
          <p className="no-tasks-message">No tasks yet. Add one!</p>
        ) : (
          <ul className="tasks-ul">
            {tasks.map(task => (
              <li key={task.id}>
                <Card 
                  task={task} 
                  onComplete={handleCompleteTask}
                  onDelete={handleDeleteTask}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Add Task:</h2>
        <input
          className="task-input"
          type="text"
          placeholder="Insert your task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="task-input text-area"
          placeholder="Insert your description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{ width: '100%' }}>
              <DatePicker 
                label="Pick a due date" 
                value={dueDate}
                onChange={(newValue) => setDueDate(newValue)}
                sx={{ 
                  width: '100%'
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </MuiThemeProvider>

        <button className="task-button" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskContainer;