// axios es una librería que engloba a fetch, no es un reemplazo
import axios from "axios";

// esta es una instancia de axios con mis propias config
const instance = axios.create({
  baseURL: "http://localhost:3000/api", // ruta al backend
  withCredentials: true, // es para que se establezcan las cookies
});

// pide todas las tareas
export const getTasks = () => instance.get("/tasks");

// pide una tarea por su id
export const getTask = (task) => instance.get(`/tasks/${task._id}`, task);

// create una nueva tarea
export const postTask = (task) => instance.post("/tasks", task);

// actualiza una tarea por su id
export const updateTask = (task) => instance.put(`/tasks/${task._id}`, task);

// borra una tarea por su id
export const deleteTask = (id) => instance.delete(`/tasks/${id}`);
