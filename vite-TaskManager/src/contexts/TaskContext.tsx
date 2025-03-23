"use client"

// src/contexts/TaskContext.tsx
import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import type { Task } from "../types/Task"
import { getTasks, addTask, deleteTask, toggleTaskCompletion, updateTask } from "../services/storageService"

// Define the type for our context
type TaskContextType = {
  tasks: Task[]
  filteredTasks: Task[]
  addNewTask: (task: Omit<Task, "id" | "createdAt">) => void
  completeTask: (id: string) => void
  removeTask: (id: string) => void
  editTask: (task: Task) => void
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  filterCategory: string | null
  setFilterCategory: React.Dispatch<React.SetStateAction<string | null>>
  filterPriority: string | null
  setFilterPriority: React.Dispatch<React.SetStateAction<string | null>>
  filterStatus: string | null
  setFilterStatus: React.Dispatch<React.SetStateAction<string | null>>
  sortBy: string
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  taskToEdit: Task | null
  setTaskToEdit: React.Dispatch<React.SetStateAction<Task | null>>
}

// Create a context with default values
const TaskContext = createContext<TaskContextType>({
  tasks: [],
  filteredTasks: [],
  addNewTask: () => {},
  completeTask: () => {},
  removeTask: () => {},
  editTask: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
  filterCategory: null,
  setFilterCategory: () => {},
  filterPriority: null,
  setFilterPriority: () => {},
  filterStatus: null,
  setFilterStatus: () => {},
  sortBy: "dueDate",
  setSortBy: () => {},
  taskToEdit: null,
  setTaskToEdit: () => {},
})

// Custom hook to use the task context
export const useTask = () => useContext(TaskContext)

// Provider component that wraps our app
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [filterPriority, setFilterPriority] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("dueDate")
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = getTasks()
    setTasks(savedTasks)
  }, [])

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())

      // Category filter
      const matchesCategory = filterCategory === null || (task.category || "Uncategorized") === filterCategory

      // Priority filter
      const matchesPriority = filterPriority === null || task.priority === filterPriority

      // Status filter
      const matchesStatus =
        filterStatus === null ||
        (filterStatus === "completed" && task.completed) ||
        (filterStatus === "pending" && !task.completed)

      return matchesSearch && matchesCategory && matchesPriority && matchesStatus
    })
    .sort((a, b) => {
      // Sort by selected criteria
      switch (sortBy) {
        case "dueDate":
          // Handle null due dates
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        case "priority":
          const priorityOrder = { High: 0, Medium: 1, Low: 2 }
          return (priorityOrder[a.priority || "Low"] || 2) - (priorityOrder[b.priority || "Low"] || 2)
        case "title":
          return a.title.localeCompare(b.title)
        case "createdAt":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

  // Add a new task
  const addNewTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    const updatedTasks = addTask(newTask)
    setTasks(updatedTasks)
  }

  // Toggle task completion
  const completeTask = (taskId: string) => {
    const updatedTasks = toggleTaskCompletion(taskId)
    setTasks(updatedTasks)
  }

  // Delete a task
  const removeTask = (taskId: string) => {
    const updatedTasks = deleteTask(taskId)
    setTasks(updatedTasks)
  }

  // Edit a task
  const editTask = (task: Task) => {
    const updatedTasks = updateTask(task)
    setTasks(updatedTasks)
    setTaskToEdit(null)
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        addNewTask,
        completeTask,
        removeTask,
        editTask,
        searchTerm,
        setSearchTerm,
        filterCategory,
        setFilterCategory,
        filterPriority,
        setFilterPriority,
        filterStatus,
        setFilterStatus,
        sortBy,
        setSortBy,
        taskToEdit,
        setTaskToEdit,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

