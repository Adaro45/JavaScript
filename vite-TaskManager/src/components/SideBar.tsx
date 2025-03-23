"use client"

// src/components/SideBar.tsx
import type React from "react"
import "./styles/Sidebar.css"
import { useTask } from "../contexts/TaskContext"

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { tasks, setFilterCategory, setFilterPriority, setFilterStatus, filterCategory, filterPriority, filterStatus } =
    useTask()

  // Count tasks by status
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = totalTasks - completedTasks

  // Get unique categories
  const categories = Array.from(new Set(tasks.map((task) => task.category || "Uncategorized")))

  // Get unique priorities
  const priorities = ["High", "Medium", "Low"]

  // Handle filter clicks
  const handleCategoryFilter = (category: string | null) => {
    setFilterCategory(category === filterCategory ? null : category)
  }

  const handlePriorityFilter = (priority: string | null) => {
    setFilterPriority(priority === filterPriority ? null : priority)
  }

  const handleStatusFilter = (status: string | null) => {
    setFilterStatus(status === filterStatus ? null : status)
  }

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h2>Dashboard</h2>
      </div>

      <div className="sidebar-section">
        <h3>Overview</h3>
        <ul className="sidebar-list">
          <li
            className={`sidebar-item ${filterStatus === null ? "active" : ""}`}
            onClick={() => handleStatusFilter(null)}
          >
            <span className="sidebar-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </span>
            <span>All Tasks</span>
            <span className="sidebar-count">{totalTasks}</span>
          </li>
          <li
            className={`sidebar-item ${filterStatus === "pending" ? "active" : ""}`}
            onClick={() => handleStatusFilter("pending")}
          >
            <span className="sidebar-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </span>
            <span>Pending</span>
            <span className="sidebar-count">{pendingTasks}</span>
          </li>
          <li
            className={`sidebar-item ${filterStatus === "completed" ? "active" : ""}`}
            onClick={() => handleStatusFilter("completed")}
          >
            <span className="sidebar-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </span>
            <span>Completed</span>
            <span className="sidebar-count">{completedTasks}</span>
          </li>
        </ul>
      </div>

      {categories.length > 0 && (
        <div className="sidebar-section">
          <h3>Categories</h3>
          <ul className="sidebar-list">
            {categories.map((category, index) => (
              <li
                key={index}
                className={`sidebar-item ${filterCategory === category ? "active" : ""}`}
                onClick={() => handleCategoryFilter(category)}
              >
                <span className="sidebar-icon">
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
                </span>
                <span>{category}</span>
                <span className="sidebar-count">
                  {tasks.filter((task) => (task.category || "Uncategorized") === category).length}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="sidebar-section">
        <h3>Priority</h3>
        <ul className="sidebar-list">
          {priorities.map((priority, index) => (
            <li
              key={index}
              className={`sidebar-item ${filterPriority === priority ? "active" : ""}`}
              onClick={() => handlePriorityFilter(priority)}
            >
              <span className={`priority-indicator priority-${priority.toLowerCase()}`}></span>
              <span>{priority}</span>
              <span className="sidebar-count">{tasks.filter((task) => task.priority === priority).length}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar

