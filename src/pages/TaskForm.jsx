import { useForm } from "react-hook-form";
import { useTaskContext } from "../context/TaskContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";

function TaskForm() {
  // traigo lo que necesito de react hook form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  //  traigo las tareas del contexto
  const { createTask, loadTask, editTask } = useTaskContext();
  const navigate = useNavigate();
  const params = useParams();

  // se ejecuta cuando carga la pág
  useEffect(() => {
    (async function () {
      if (params.id) {
        const task = await loadTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
      }
    })();
  }, []);

  // función que se ejecuta cuando se agrega la tarea (envío del form)
  const onSubmit = handleSubmit((data) => {
    // acá el submit del form hace una cosa u otra, dependiendo de si está creando o editando una tarea
    if (params.id) {
      // edita la tarea
      editTask(params.id, { ...data, date: dayjs.utc(data.date).format() });
      // redirige a las tareas del usuario
      navigate("/tasks");
    } else {
      // crea la tarea
      createTask({ ...data, date: dayjs.utc(data.date).format() });
      // redirige a las tareas del usuario
      navigate("/tasks");
    }
  });

  return (
    <div className="max-w-sm border p-2">
      <form onSubmit={onSubmit}>
        {/* TITULO */}
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered input-md my-1 w-full"
          {...register("title", { required: true })}
        />
        {errors.title && <p className="text-red-500">Title is required</p>}
        {/* DESCIPRICION */}
        <textarea
          rows={3}
          placeholder="Description"
          className="textarea textarea-bordered textarea-md my-1 w-full"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && (
          <p className="text-red-500">Description is required</p>
        )}
        {/* FECHA */}
        <input
          type="date"
          className="input input-bordered input-md my-1 w-full"
          {...register("date", { required: true })}
        />
        {errors.date && <p className="text-red-500">Date is required</p>}
        {/* BOTON */}
        <button type="submit" className="btn">
          Add
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
