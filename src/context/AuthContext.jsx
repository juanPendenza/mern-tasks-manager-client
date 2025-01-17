import { createContext, useContext, useEffect, useState } from "react";
import { postLogin, postRegister } from "../api/auth.js";
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

  // función que limpia los errores
  useEffect(() => {
    // limpio los errores desp de 3 seg
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      // limpio el timer por si el usuario cambia de pag o deja de usar es useEffect
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    // leo las cookies del encabezado
    const cookies = Cookies.get();

    if (cookies.token) {
      console.log(cookies.token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signup, signin, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
