import { createContext, useContext, useState } from "react";
import { getTasks, postTask } from "../api/task.js";

// creo el contexto
export const TaskContext = createContext();

// función para usar el contexto
export const useTaskContext = () => {
  const taskContext = useContext(TaskContext);
  if (!taskContext) {
    throw new Error("useTaskContext must be used within an TaskProvider");
  } else {
    return taskContext;
  }
};

// es el componente que engloba a otros, y los que esten dentro (children)
// van a poder usar los datos del contexto que esten en "values"
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // función que muestra las tareas
  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // función que cera una tarea
  const createTask = async (task) => {
    await postTask(task);
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, loadTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
