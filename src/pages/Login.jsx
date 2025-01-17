import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

function Login() {
  // traigo los datos del contexto
  const { signin, errors: signinErrors } = useAuthContext();

  // traigo lo que necesito de react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // función que maneja el sumbit el form
  const onSubmit = handleSubmit(async (values) => {
    signin(values);
  });

  return (
    <div className="max-w-md border p-2">
      <h1 className="font-bold text-3xl">Login</h1>
      {signinErrors.map((error, index) => (
        <div key={index} className="bg-red-500 text-white p-2">
          {error}
        </div>
      ))}
      <form onSubmit={onSubmit}>
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
          Login
        </button>
      </form>
      <p>
        Don´t have an account?{" "}
        <Link className="border p-2" to={"/register"}>
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
