// axios es una librería que engloba a fetch, no es un reemplazo
import axios from "axios";

// esta es una instancia de axios con mis propias config
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api", // ruta al backend
  withCredentials: true, // es para que se establezcan las cookies
});

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
