"use client"

// src/components/TaskForm.tsx
import type React from "react"
import { useState, useEffect } from "react"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs, { type Dayjs } from "dayjs"
import { useTask } from "../contexts/TaskContext"
import "./styles/TaskForm.css"

const TaskForm: React.FC = () => {
  const { addNewTask, taskToEdit, editTask } = useTask()

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [dueDate, setDueDate] = useState<Dayjs | null>(null)
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium")
  const [category, setCategory] = useState<string>("")

  // Update form when editing a task
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title)
      setDescription(taskToEdit.description || "")
      setDueDate(taskToEdit.dueDate ? dayjs(taskToEdit.dueDate) : null)
      setPriority(taskToEdit.priority || "Medium")
      setCategory(taskToEdit.category || "")
    }
  }, [taskToEdit])

  // Reset form
  const resetForm = () => {
    setTitle("")
    setDescription("")
    setDueDate(null)
    setPriority("Medium")
    setCategory("")
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate that at least title is provided
    if (!title.trim()) {
      alert("Please enter a task title")
      return
    }

    if (taskToEdit) {
      // Update existing task
      editTask({
        ...taskToEdit,
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate ? dueDate.toISOString() : null,
        priority,
        category: category.trim() || undefined,
      })
    } else {
      // Create a new task
      addNewTask({
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate ? dueDate.toISOString() : null,
        completed: false,
        priority,
        category: category.trim() || undefined,
      })
    }

    // Reset form
    resetForm()
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{taskToEdit ? "Edit Task" : "Add Task"}</h2>

      <div className="form-group">
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          className="task-input"
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          className="task-input text-area"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-category">Category</label>
          <input
            id="task-category"
            className="task-input"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            className="task-input"
            value={priority}
            onChange={(e) => setPriority(e.target.value as "High" | "Medium" | "Low")}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <DatePicker
          label="Pick a due date"
          value={dueDate}
          onChange={(newValue) => setDueDate(newValue)}
          sx={{ width: "100%" }}
        />
      </div>

      <div className="form-actions">
        {taskToEdit && (
          <button
            type="button"
            className="cancel-button"
            onClick={() => {
              resetForm()
              editTask(taskToEdit) // This will trigger the useEffect to reset the form
            }}
          >
            Cancel
          </button>
        )}
        <button className="task-button" type="submit">
          {taskToEdit ? "Update Task" : "Add Task"}
        </button>
      </div>
    </form>
  )
}

export default TaskForm

