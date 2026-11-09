import React, { useState, useId, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { addTask } from "../context/TaskContext.jsx";

function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const { tasks, setTasks } = useContext(TaskContext)
  const formId = useId()

  function handleSubmit(e) {
    e.preventDefault();
    if (taskName.trim() === "") return;
    addTask(taskName, tasks, setTasks)
    setTaskName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={formId}>New Task:</label>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        id={formId}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
