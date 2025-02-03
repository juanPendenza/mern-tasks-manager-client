import React from "react";
import { useTaskContext } from "../context/TaskContext.jsx";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskCard({ task }) {
  const { eliminateTask } = useTaskContext();

  return (
    <li className="border my-3">
      {/* titulo de la tarea */}
      <h1>{task.title}</h1>
      {/* descripción de la tarea */}
      <p>{task.description}</p>
      {/* fecha de la tarea */}
      <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
      {/* botón para editar */}
      <Link to={`/tasks/${task._id}`} className="border bg-zinc-600">
        Edit
      </Link>
      {/* botón para eliminar */}
      <button
        onClick={() => {
          eliminateTask(task._id);
        }}
        className="border bg-zinc-600"
      >
        Delete
      </button>
    </li>
  );
}

export default TaskCard;
