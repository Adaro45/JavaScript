"use client"

// src/components/Card.tsx
import type React from "react"
import type { Task } from "../types/Task"
import "./styles/Card.css"
import { useTask } from "../contexts/TaskContext"

interface CardProps {
  task: Task
}

const Card: React.FC<CardProps> = ({ task }) => {
  const { completeTask, removeTask, setTaskToEdit } = useTask()

  // Format the date for display
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "No due date"

    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate if task is overdue
  const isOverdue = (): boolean => {
    if (!task.dueDate || task.completed) return false
    const dueDate = new Date(task.dueDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return dueDate < today
  }

  // Calculate days remaining
  const getDaysRemaining = (): string => {
    if (!task.dueDate) return ""

    const dueDate = new Date(task.dueDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (dueDate < today) return "Overdue"

    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    return `${diffDays} days left`
  }

  return (
    <div className={`task-card ${task.completed ? "completed" : ""} ${isOverdue() ? "overdue" : ""}`}>
      <div className="task-header">
        <div className="task-title-row">
          <div className="task-checkbox">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => completeTask(task.id)}
              id={`task-${task.id}`}
            />
            <label htmlFor={`task-${task.id}`}></label>
          </div>
          <h3 className="task-title">{task.title}</h3>
        </div>
        <div className="task-actions">
          <button className="edit-btn" onClick={() => setTaskToEdit(task)} aria-label="Edit task">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button className="delete-btn" onClick={() => removeTask(task.id)} aria-label="Delete task">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="task-description">{task.description}</div>

      <div className="task-meta">
        {task.category && (
          <span className="task-category">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            {task.category}
          </span>
        )}

        {task.priority && (
          <span className={`task-priority priority-${task.priority.toLowerCase()}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM15.42 15.42l6.37-6.37a4.5 4.5 0 0 0-6.37-6.36L9.06 9.05"></path>
            </svg>
            {task.priority}
          </span>
        )}

        <span className={`task-date ${isOverdue() ? "overdue" : ""}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {formatDate(task.dueDate)}
          {task.dueDate && !task.completed && <span className="days-remaining">{getDaysRemaining()}</span>}
        </span>
      </div>
    </div>
  )
}

export default Card

