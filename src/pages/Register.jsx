import { useForm } from "react-hook-form";
import { postRegister } from "../api/auth.js";

function Register() {
  // react-hook-form es un módulo de react que tiene varias funciones
  // en gral maneja el camio de estado y las validaciones
  const { register, handleSubmit } = useForm();

  // función que maneja el sumbit el form
  const onSubmit = handleSubmit(async (values) => {
    const res = await postRegister(values);
    console.log(res);
  });

  return (
    <div className="max-w-md border p-2">
      <form onSubmit={onSubmit}>
        {/* NOMBRE DE USUARIO */}
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered input-md my-1 w-full"
          {...register("username", { required: true })}
        />
        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered input-md my-1 w-full"
          {...register("email", { required: true })}
        />
        {/* CONTRASEÑA */}
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered input-md my-1 w-full"
          {...register("password", { required: true })}
        />
        {/* BOTON */}
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
