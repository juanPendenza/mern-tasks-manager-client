import { createContext, useContext, useState } from "react";
import { postRegister } from "../api/auth.js";

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
  return (
    <AuthContext.Provider value={{ user, signup, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
