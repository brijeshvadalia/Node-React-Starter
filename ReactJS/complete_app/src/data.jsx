let data = [
    { id: 1, title: "Task 1" },
    { id: 2, title: "Task 2" },
    { id: 3, title: "Task 3" }
  ];
  
  export const getAllTasks = () => {
    return data;
  };
  
  export const addTask = (task) => {
    const newTask = { id: data.length + 1, title: task };
    data.push(newTask);
  };
  
  export const deleteTask = (id) => {
    data = data.filter((task) => task.id !== id);
  };
  
  export const updateTask = (id, updatedTask) => {
    data = data.map((task) => (task.id === id ? { ...task, title: updatedTask } : task));
  };
  