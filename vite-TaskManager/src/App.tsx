"use client"

// src/App.tsx
import { useState, useEffect } from "react"
import "./App.css"
import TaskContainer from "./components/TaskContainer"
import ThemeToggle from "./components/ThemeToggle"
import Sidebar from "./components/SideBar"
import { ThemeProvider } from "./contexts/ThemeContext"
import { TaskProvider } from "./contexts/TaskContext"

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)

      // Auto-close sidebar on mobile when resizing
      if (mobile && sidebarOpen) {
        setSidebarOpen(false)
      } else if (!mobile && !sidebarOpen) {
        setSidebarOpen(true)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [sidebarOpen])

  // Handle clicks outside sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile && sidebarOpen) {
        // Check if click is outside sidebar and not on the toggle button
        const sidebar = document.querySelector(".sidebar")
        const toggleBtn = document.querySelector(".sidebar-toggle")

        if (sidebar && !sidebar.contains(e.target as Node) && toggleBtn && !toggleBtn.contains(e.target as Node)) {
          setSidebarOpen(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobile, sidebarOpen])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="app-container">
          <div className={`app-layout ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <main className="main-content">
              <header className="app-header">
                <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </button>
                <h1 className="main-title">Task Manager</h1>
                <ThemeToggle />
              </header>
              <TaskContainer />
            </main>
          </div>
        </div>
      </TaskProvider>
    </ThemeProvider>
  )
}

export default App

