// axios es una librería que engloba a fetch, no es un reemplazo
import axios from "axios";

// ruta al bbackend
const API = "http://localhost:3000/api";

// esta es una instancia de axios con mis propias config
const instance = axios.create({
  baseURL: API,
  withCredentials: true, // es para que se establezcan las cookies
});

// post a /register
export const postRegister = (user) => instance.post("/register", user);

// post a /login
export const postLogin = (user) => instance.post("/login", user);

export const verifyToken = () => instance.get("/auth/verify");
