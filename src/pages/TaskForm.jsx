import { useForm } from "react-hook-form";
import { useTaskContext } from "../context/TaskContext.jsx";
import { useNavigate } from "react-router-dom";

function TaskForm() {
  // traigo lo que necesito de react hook form
  const { register, handleSubmit } = useForm();
  //  traigo las tareas del contexto
  const { tasks, createTask } = useTaskContext();
  const navigate = useNavigate();

  // función que se ejecuta cuando se agrega la tarea (envío del form)
  const onSubmit = handleSubmit((data) => {
    // crea la tarea
    createTask(data);
    // redirige a las tareas del usuario
    navigate("/tasks");
  });

  return (
    <div className="max-w-sm border p-2">
      <form onSubmit={onSubmit}>
        {/* NOMBRE DE USUARIO */}
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered input-md my-1 w-full"
          {...register("title", { required: true })}
        />
        {/* EMAIL */}
        <textarea
          rows={3}
          placeholder="Description"
          className="textarea textarea-bordered textarea-md my-1 w-full"
          {...register("description", { required: true })}
        ></textarea>
        {/* BOTON */}
        <button type="submit" className="btn">
          Add
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
