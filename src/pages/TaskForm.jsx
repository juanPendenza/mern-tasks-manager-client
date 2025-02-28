import { useForm } from "react-hook-form";
import { useTaskContext } from "../context/TaskContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

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
    <div className="h-screen w-screen bg-[#100013]">
      <Navbar />
      <div className="hero h-[calc(100%-160px)]">
        <div className="hero-content text-center">
          <div className="max-w-md rounded-lg p-4 border border-[#de4a00] flex flex-col gap-6 bg-[#15001a]">
            <h1 className="font-bold text-3xl md:text-5xl text-white">
              Agregar tarea
            </h1>
            <form
              className="w-72 md:w-96 flex flex-col p-2 gap-2"
              onSubmit={onSubmit}
            >
              {/* TITULO */}
              <input
                type="text"
                placeholder="Título"
                className="input input-bordered input-md my-1 w-full"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-red-500 m-0 p-0 text-sm text-start">
                  Title is required
                </p>
              )}
              {/* DESCIPRICION */}
              <textarea
                rows={3}
                placeholder="Descripción"
                className="textarea textarea-bordered textarea-md my-1 w-full"
                {...register("description", { required: true })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 m-0 p-0 text-sm text-start">
                  Description is required
                </p>
              )}
              {/* FECHA */}
              <input
                type="date"
                className="input input-bordered input-md my-1 w-full"
                {...register("date", { required: true })}
              />
              {errors.date && (
                <p className="text-red-500 m-0 p-0 text-sm text-start">
                  Date is required
                </p>
              )}
              {/* BOTON */}
              <button
                type="submit"
                className="btn bg-[#de4a00] hover:bg-[#de4a00]/70 text-white md:text-lg"
              >
                Agregar
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TaskForm;
