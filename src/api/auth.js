// axios es una librería que engloba a fetch, no es un reemplazo
import axios from "axios";

// ruta al bbackend
const API = "http://localhost:3000/api";

// post a /register
export const postRegister = (user) => axios.post(`${API}/register`, user);

// post a /login
export const postLogin = (user) => axios.post(`${API}/login`, user);
