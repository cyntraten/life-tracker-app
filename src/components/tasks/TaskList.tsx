import { useTranslation } from "react-i18next";
import useLifeStore from "../../store/useLifeStore";
import { formatEventDate } from "../../lib/utils";
import { useEffect } from "react";

export default function TaskList() {
  const { tasks, toggleTask, loadTasksFromDB, loadingTasks } = useLifeStore();
  const { t } = useTranslation();

  const sortedTasks = [...tasks].sort((t1, t2) => t1.timestamp - t2.timestamp);

  if (sortedTasks.length === 0) {
    return <p className="text-gray-500">{t("emptyTasksList")}</p>;
  }

  useEffect(() => {
    useLifeStore.getState().loadTasksFromDB();
  }, [loadTasksFromDB]);

  if (loadingTasks) {
    return (
      <div className="mt-3">
        <div className="animate-pulse">
          <div className="flex-col items-center justify-between">
            <div className="mt-4 h-4 bg-gray-300 rounded w-full"></div>
            <div className="mt-4 h-4 bg-gray-300 rounded w-full"></div>
            <div className="mt-4 h-4 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-3">
        <div>
          {sortedTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="mr-3 w-4 h-4 rounded text-blue-500"
                />
                <span className={task.done ? "line-through text-gray-400" : ""}>
                  {task.title}
                </span>
              </div>
              <span className="text-gray-500 text-sm">
                {t(formatEventDate(task.timestamp))}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
