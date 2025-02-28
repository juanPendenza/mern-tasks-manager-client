import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";

function Navbar() {
  const { isAuthenticated, logout } = useAuthContext();

  return (
    <div className="sticky top-0 z-50 navbar flex justify-between items-center h-20 border-b border-[#de4a00] bg-[#100013]">
      <div>
        <Link
          to={isAuthenticated ? "/tasks" : "/"}
          className="btn btn-ghost text-xl lg:text-3xl text-white"
        >
          To-Do list
        </Link>
      </div>
      <div>
        <ul className="menu menu-horizontal px-1 flex items-center gap-2">
          {!isAuthenticated ? (
            <>
              <li>
                <Link className="link link-primary lg:text-lg" to={"/login"}>
                  Iniciar cesión
                </Link>
              </li>
              <li>
                <Link className="link link-primary lg:text-lg" to={"/register"}>
                  Registrar
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className="link link-primary lg:text-lg"
                  to={"/tasks/add-task"}
                >
                  Agregar tarea
                </Link>
              </li>
              <li>
                <Link
                  className="link link-primary lg:text-lg"
                  to={"/"}
                  onClick={() => {
                    logout();
                  }}
                >
                  Cerrar cesión
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
