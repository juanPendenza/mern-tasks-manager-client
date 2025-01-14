import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="max-w-md border p-2">
      {registerErrors.map((error, index) => (
        <div key={index} className="bg-red-500 text-white p-2">
          {error}
        </div>
      ))}
      <form onSubmit={onSubmit}>
        {/* NOMBRE DE USUARIO */}
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered input-md my-1 w-full"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <p className="text-red-500">Username is required</p>
        )}
        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered input-md my-1 w-full"
          {...register("email", { required: true })}
        />
        {errors.email && <p className="text-red-500">Email is required</p>}
        {/* CONTRASEÑA */}
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered input-md my-1 w-full"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-red-500">Password is required</p>
        )}
        {/* BOTON */}
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
