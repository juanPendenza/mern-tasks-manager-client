import { useEffect } from "react";
import { useTaskContext } from "../context/TaskContext.jsx";

function TasksPage() {
  const { loadTasks, tasks } = useTaskContext();

  // cuando carga la página se piden todas las tareas al back
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="border my-3">
            <h1>{task.title}</h1>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TasksPage;
