import React from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

function AuthenticateRoutes() {
  const { user, isAuthenticated } = useAuthContext();

  // si el usuario no esta autenticado lo mando al login
  if (!isAuthenticated) return <Navigate to={"/login"} replace />;

  // si está autenticado lo mando al componente que está adentro (esto es lo que hace el componente Outlet)
  return <Outlet />;
}

export default AuthenticateRoutes;
