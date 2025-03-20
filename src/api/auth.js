import { instance } from "./api.js";

// post a /register
export const postRegister = (user) => instance.post("/register", user);

// post a /login
export const postLogin = (user) => instance.post("/login", user);

// post a /logout
export const postLogout = (user) => instance.post("/logout");

// get a /verify
export const verifyToken = () => instance.get("/verify");
