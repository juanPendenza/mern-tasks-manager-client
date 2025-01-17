import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./pages/Home.jsx";
import Tasks from "./pages/Tasks.jsx";
import AddTask from "./pages/AddTask.jsx";
import Task from "./pages/Task.jsx";
import Profile from "./pages/Profile.jsx";
import AuthenticateRoutes from "./components/AuthenticateRoutes.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* RUTAS PARA TODO EL MUNDO */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* RUTAS PARA USUARIOS LOGEADOS */}
          <Route element={<AuthenticateRoutes />}>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:id" element={<Task />} />
            <Route path="/tasks/add-task" element={<AddTask />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
