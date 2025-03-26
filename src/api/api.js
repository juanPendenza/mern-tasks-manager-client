// axios es una librería que engloba a fetch, no es un reemplazo
import axios from "axios";

// esta es una instancia de axios con mis propias config
export const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000", // ruta al backend
  withCredentials: true, // es para que se establezcan las cookies
});
