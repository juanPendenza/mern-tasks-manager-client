import React from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

function AuthenticateRoutes() {
  const { isAuthenticated, loading } = useAuthContext();
  // si está cargando muestro el loading
  if (loading) return <h1>Loading...</h1>;
  // si no está caargando y el usuario no esta autenticado lo mando al login
  if (!loading && !isAuthenticated) return <Navigate to={"/login"} replace />;

  // si está autenticado lo mando al componente que está adentro (esto es lo que hace el componente Outlet)
  return <Outlet />;
}

export default AuthenticateRoutes;
