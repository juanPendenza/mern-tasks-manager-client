import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/register" element={<h1>Register</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/tasks" element={<h1>Tasks</h1>} />
        <Route path="/tasks/:id" element={<h1>Task by id</h1>} />
        <Route path="/tasks/add-task" element={<h1>Add task</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
