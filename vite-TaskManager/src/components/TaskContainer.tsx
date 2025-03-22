// import React, { useState } from "react";
import "./styles/TaskContainer.css";
import Card from "./Card";
import "react-datepicker/dist/react-datepicker.css";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const TaskContainer = () => {

  return (
    <div className="task-container">
      <div className="task-list">
        <h2>Tasks:</h2>
        <ul>
          <li>
            <Card />
          </li>
          <li>
            <Card />
          </li>
        </ul>
      </div>
      <form className="task-form">
        <h2>Add Task:</h2>
        <input
          className="task-input"
          type="text"
          placeholder="Insert your task"
        />
        <textarea
          className="task-input text-area"
          placeholder="Insert your description"
        />
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Pick a date"/>
      </DemoContainer>
    </LocalizationProvider>

        <button className="task-button" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskContainer;
