import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";

function Navbar() {
  const { isAuthenticated, logout } = useAuthContext();

  return (
    <div className="navbar border">
      <div className="flex-1">
        <Link
          to={isAuthenticated ? "/tasks" : "/"}
          className="btn btn-ghost text-xl"
        >
          Task manager
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {!isAuthenticated ? (
            <>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/register"}>Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/tasks/add-task"}>Add task</Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
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
