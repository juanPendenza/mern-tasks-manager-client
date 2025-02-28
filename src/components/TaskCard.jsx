import React from "react";
import { useTaskContext } from "../context/TaskContext.jsx";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskCard({ task }) {
  const { eliminateTask } = useTaskContext();

  return (
    <li className="w-72 md:w-80 rounded-lg p-4 border border-[#de4a00] flex flex-col gap-2 bg-[#15001a]">
      {/* titulo de la tarea */}
      <h1 className="text-white lg:text-lg font-bold">
        {task.title.toUpperCase()}
      </h1>
      {/* descripción de la tarea */}
      <p className="text-white lg:text-md">{task.description}</p>
      {/* fecha de la tarea */}
      <p className="text-white lg:text-lg">
        {dayjs(task.date).utc().format("DD/MM/YYYY")}
      </p>
      <div className="w-full flex justify-end mt-3 gap-2">
        {/* botón para editar */}
        <Link
          to={`/tasks/${task._id}`}
          className=" btn bg-blue-700 hover:bg-blue-800 text-white"
        >
          Editar
        </Link>
        {/* botón para eliminar */}
        <button
          onClick={() => {
            eliminateTask(task._id);
          }}
          className="btn bg-red-700 hover:bg-red-900 text-white"
        >
          Borrar
        </button>
      </div>
    </li>
  );
}

export default TaskCard;
