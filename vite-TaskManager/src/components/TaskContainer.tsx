"use client"

// src/components/TaskContainer.tsx
import type React from "react"
import "./styles/TaskContainer.css"
import Card from "./Card"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useTheme } from "../contexts/ThemeContext"
import { useTask } from "../contexts/TaskContext"
import TaskForm from "./TaskForm"

const TaskContainer: React.FC = () => {
  // Get the dark mode state from our theme context
  const { darkMode } = useTheme()

  // Get task context
  const { filteredTasks, searchTerm, setSearchTerm, sortBy, setSortBy, taskToEdit } = useTask()

  // Create a Material UI theme based on our dark mode state
  const muiTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#6366f1",
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#374151" : "#ffffff",
          },
        },
      },
    },
  })

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className="task-container">
        <div className="task-controls">
          <div className="search-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="search-icon"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="sort-container">
            <label htmlFor="sort-select">Sort by:</label>
            <select id="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
              <option value="createdAt">Created Date</option>
            </select>
          </div>
        </div>

        <div className="task-content">
          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <div className="no-tasks-message">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="no-tasks-icon"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <p>No tasks found. Add a new task to get started!</p>
              </div>
            ) : (
              <ul className="tasks-ul">
                {filteredTasks.map((task) => (
                  <li key={task.id} className="task-item">
                    <Card task={task} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TaskForm />
          </LocalizationProvider>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

export default TaskContainer

