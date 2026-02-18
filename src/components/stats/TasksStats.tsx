import { getTasksStats } from "../../lib/stats";
import useLifeStore from "../../store/useLifeStore";
import { GlassCard } from "../ui/GlassCard";

export default function TasksStats() {
  const { tasks } = useLifeStore();
  const { numberOfTasks, completedTasks, completedPercent } =
    getTasksStats(tasks);

  return (
    <div>
      <GlassCard className="p-4 m-4">
        <div className="flex flex-col">
          <h2>Задачи</h2>
          <p>
            Выполнено: {completedTasks}/{numberOfTasks} ({completedPercent}%)
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
