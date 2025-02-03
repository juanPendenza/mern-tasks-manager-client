import { createContext, useContext, useState } from "react";
import {
  deleteTask,
  getTask,
  getTasks,
  postTask,
  updateTask,
} from "../api/task.js";

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

  // función que devuelve las tareas
  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // función que devuelve una sola tarea por su id
  const loadTask = async (id) => {
    try {
      const res = await getTask(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  // función que borra una tarea por su id
  const eliminateTask = async (id) => {
    try {
      const res = await deleteTask(id);
      // el error 204 no responde nada
      // entonces vuelvo a setear las tareas sin la que eliminé, para que se actualicen en /tasks
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // función que actualiza una tarea
  const editTask = async (id, task) => {
    try {
      await updateTask(id, task);
    } catch (error) {
      console.error(error);
    }
  };

  // función que cera una tarea
  const createTask = async (task) => {
    const res = await postTask(task);
    console.log(res);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        loadTasks,
        eliminateTask,
        loadTask,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
