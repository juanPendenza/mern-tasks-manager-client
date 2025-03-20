import { instance } from "./api.js";

// pide todas las tareas
export const getTasks = () => instance.get("/tasks");

// pide una tarea por su id
export const getTask = (id) => instance.get(`/tasks/${id}`);

// create una nueva tarea
export const postTask = (task) => instance.post("/tasks", task);

// actualiza una tarea por su id
export const updateTask = (id, task) => instance.put(`/tasks/${id}`, task);

// borra una tarea por su id
export const deleteTask = (id) => instance.delete(`/tasks/${id}`);
