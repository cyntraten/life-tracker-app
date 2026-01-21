import useLifeStore from "../../store/useLifeStore";
import { GlassCard } from "../ui/GlassCard";

export default function TodayTasks() {
  const { tasks, toggleTask } = useLifeStore();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayTimestamp = todayStart.getTime();

  const tomorrowStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );
  const tomorrowTimestamp = tomorrowStart.getTime();
  const todayTasks = tasks.filter(
    (task) => +task.date >= todayTimestamp && +task.date < tomorrowTimestamp,
  );

  return (
    <GlassCard className="p-4 mt-4">
      <h3 className="font-medium text-4xl mb-3 px-2">Сегодня</h3>
      {todayTasks.length === 0 ? (
        <p className="text-gray-500 text-2xl px-2">Нет задач на сегодня</p>
      ) : (
        <div className="font-medium p-4">
          {todayTasks.map((task) => (
            <div key={task.id} className="flex items-center">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => {
                  toggleTask(task.id);
                  console.log(tasks);
                }}
                className="mr-3 w-5 h-5 rounded"
              />
              <span className={task.done ? "line-through text-gray-400" : ""}>
                <p className="text-2xl">{task.title}</p>
              </span>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
