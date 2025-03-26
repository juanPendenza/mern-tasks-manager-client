import { useEffect } from "react";
import { useTaskContext } from "../context/TaskContext.jsx";
import TaskCard from "../components/TaskCard.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function TasksPage() {
  const { loadTasks, tasks } = useTaskContext();

  // cuando carga la página se piden todas las tareas al back
  useEffect(() => {
    // loadTasks();
    (async function () {
      await loadTasks();
      return;
    })();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#100013]">
      <Navbar />
      <div className="flex justify-center min-h-screen">
        {/* cuando un usuario se registra y no tiene tareas lo aclaro en pantalla */}
        {tasks.length === 0 ? (
          <div className="h-fit text-center mt-52">
            <h1 className="text-2xl text-white">No hay tareas</h1>
            <p>Crea tu primer tarea</p>
          </div>
        ) : (
          <ul className="w-3/4 h-full flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-10 py-10">
            {/* recorro las tareas y las muestro en pantalla */}
            {tasks.map((t) => (
              <TaskCard task={t} key={t._id} />
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default TasksPage;
