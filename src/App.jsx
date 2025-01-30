import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./pages/Home.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import TaskForm from "./pages/TaskForm.jsx";
import Profile from "./pages/Profile.jsx";
import AuthenticateRoutes from "./components/AuthenticateRoutes.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* RUTAS PARA TODO EL MUNDO */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* RUTAS PARA USUARIOS LOGEADOS */}
            <Route element={<AuthenticateRoutes />}>
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/tasks/:id" element={<TaskForm />} />
              <Route path="/tasks/add-task" element={<TaskForm />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
