import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function Register() {
  // react-hook-form es un módulo de react que tiene varias funciones
  // en gral maneja el camio de estado y las validaciones
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // traigo los datos del contexto
  const { signup, isAuthenticated, errors: registerErrors } = useAuthContext();
  // se usa para redirigir
  const navigate = useNavigate();

  // cuando el usuario ya esta autenticado, redirigimos a su lista de tareas
  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  // función que maneja el sumbit el form
  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="h-screen w-screen bg-[#100013]">
      <Navbar />
      <div className="hero h-[calc(100%-144px)]">
        <div className="hero-content text-center">
          <div className="max-w-md rounded-lg p-4 border border-[#de4a00] flex flex-col gap-6 bg-[#15001a]">
            <h1 className="font-bold text-3xl md:text-5xl text-white">
              Registrar
            </h1>
            {registerErrors.map((error, index) => (
              <div key={index} className="bg-red-500 text-white px-2">
                {error}
              </div>
            ))}
            <form
              className="w-72 md:w-96 flex flex-col p-2 gap-2"
              onSubmit={onSubmit}
            >
              {/* NOMBRE DE USUARIO */}
              <input
                type="text"
                placeholder="Nombre"
                className="input input-bordered input-md my-1 w-full"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="text-red-500 m-0 p-0 text-sm text-start">
                  Username is required
                </p>
              )}
              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered input-md my-1 w-full"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 m-0 p-0 text-sm text-start">
                  Email is required
                </p>
              )}
              {/* CONTRASEÑA */}
              <input
                type="password"
                placeholder="Contraseña"
                className="input input-bordered input-md my-1 w-full"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 m-0 p-0 text-sm text-start">
                  Password is required
                </p>
              )}
              {/* BOTON */}
              <button
                type="submit"
                className="btn bg-[#de4a00] hover:bg-[#de4a00]/70 text-white md:text-lg"
              >
                Registrar
              </button>
            </form>
            <p>
              Ya tienes una cuenta?{" "}
              <Link className="p-2 link link-primary" to={"/login"}>
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
