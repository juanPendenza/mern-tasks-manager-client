import { createContext, useContext, useEffect, useState } from "react";
import {
  postLogin,
  postLogout,
  postRegister,
  verifyToken,
} from "../api/auth.js";
import Cookies from "js-cookie";

// creo el contexto
export const AuthContext = createContext();

// función para usar el contexto
export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  } else {
    return authContext;
  }
};

// es el componente que engloba a otros, y los que esten dentro (children)
// van a poder usar los datos del contexto que esten en "values"
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  // es un estado que creo para saber si están cargando los datos del usuario
  const [loading, setLoading] = useState(true);

  // función registra un usuario en la db
  const signup = async (user) => {
    try {
      // llama a postRegister
      const res = await postRegister(user);
      // setea el usuario con los datos del form
      setUser(res.data);
      // una vez que se registra el usuario, pasa a estar autenticado
      setIsAuthenticated(true);
    } catch (error) {
      // si hay un error lo guardo en el estado errors
      setErrors(error.response.data);
    }
  };

  // función logea un usuario autenticado
  const signin = async (user) => {
    try {
      // llama a postLogin
      const res = await postLogin(user);
      console.log(res.data);
      // setea el usuario con los datos del form
      setUser(res.data);
      // una vez que se logea el usuario, pasa a estar autenticado
      setIsAuthenticated(true);
    } catch (error) {
      // si hay un error lo guardo en el estado errors
      setErrors(error.response.data);
    }
  };

  // función que cierra sesión
  const logout = async () => {
    try {
      // ejecuta postLogin
      await postLogout();
      // desautentica al usuario
      setIsAuthenticated(false);
      // setea el usuario a nulo (no hay usuario)
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  // función que limpia los errores
  useEffect(() => {
    // limpio los errores desp de 3 seg
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      // limpio el timer para que no se cree cuando el usuario cambia de pag o deja de usar es useEffect
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // verifico la autenticación cada vez que carga la pág
  useEffect(() => {
    // ejecuto la función que checkea que el token enviado en el login sea correcto
    (async function checkLogin() {
      // leo las cookies
      const cookies = Cookies.get();
      // si dentro de las cookies no existe el token
      if (!cookies.token) {
        // desautentico al usuario
        setIsAuthenticated(false);
        // la página no está cargando
        setLoading(false);
        // no existen los datos del usuario
        return setUser(null);
      }
      // si dentro de las cookies existe el token
      try {
        // ejecuto la función que lo verifica (para que no se pueda establecer uno falso desde el navegador)
        const res = await verifyToken(cookies.token);
        // si no responde nada
        if (!res.data) {
          // desautentico al usuario
          setIsAuthenticated(false);
          // la página no está cargando
          setLoading(false);
          return;
        }
        // si responde algo
        // autentico al usuario
        setIsAuthenticated(true);
        // lo lleno con sus datos
        setUser(res.data);
        // cargo la página
        setLoading(false);
      } catch (error) {
        // si hay algún error lo muestro
        console.log(error);
        // desautentico al usuario
        setIsAuthenticated(false);
        // no existen sus datos
        setUser(null);
        // l página no carga
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signup, signin, logout, isAuthenticated, errors, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
