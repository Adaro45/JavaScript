// src/components/Card.tsx
import React from 'react';
import { Task } from '../types/Task';
import './styles/Card.css';

interface CardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ task, onComplete, onDelete }) => {
  // Format the date for display
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'No due date';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-date">Due: {formatDate(task.dueDate)}</div>
      </div>
      
      <div className="task-description">{task.description}</div>
      
      <div className="task-actions">
        <button 
          className={`complete-btn ${task.completed ? 'completed' : ''}`} 
          onClick={() => onComplete(task.id)}
        >
          {task.completed ? 'Completed' : 'Mark Complete'}
        </button>
        <button 
          className="delete-btn" 
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;