// src/App.tsx
import React from 'react';
import './App.css';
import TaskContainer from './components/TaskContainer';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <ThemeToggle />
        <h1 className='main-title'>TASK MANAGER</h1>
        <TaskContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;