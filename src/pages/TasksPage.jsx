import { useEffect } from "react";
import { useTaskContext } from "../context/TaskContext.jsx";
import TaskCard from "../components/TaskCard.jsx";

function TasksPage() {
  const { loadTasks, tasks } = useTaskContext();

  // cuando carga la página se piden todas las tareas al back
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <ul>
        {/* recorro las tareas y las muestro en pantalla */}
        {tasks.map((t) => (
          <TaskCard task={t} key={t._id} />
        ))}
      </ul>
    </div>
  );
}

export default TasksPage;
