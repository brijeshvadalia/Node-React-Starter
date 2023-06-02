import React, { useState, useEffect } from "react";
import { getAllTasks, addTask, deleteTask, updateTask } from "./data";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    // Load initial tasks
    setTasks(getAllTasks());
  }, []);

  const handleAddTask = () => {
    addTask(newTask);
    setTasks(getAllTasks());
    setNewTask("");
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
    setTasks(getAllTasks());
  };

  const handleUpdateTask = (id, updatedTask) => {
    updateTask(id, updatedTask);
    setTasks(getAllTasks());
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            <input
              type="text"
              value={task.title}
              onChange={(e) => handleUpdateTask(task.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default App;
