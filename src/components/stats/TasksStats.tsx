import { useTranslation } from "react-i18next";
import { getTasksStats } from "../../lib/stats";
import { GlassCard } from "../ui/GlassCard";
import useTaskStore from "../../store/useTaskStore";

export default function TasksStats() {
  const { tasks, loadingTasks } = useTaskStore();
  const { numberOfTasks, completedTasks, completedPercent } =
    getTasksStats(tasks);
  const { t } = useTranslation();

  if (loadingTasks) {
    return (
      <div>
        <GlassCard className="p-4 m-4">
          <div className="flex flex-col">
            <h2>{t("tasks")}</h2>
            <p className="flex items-center">
              {t("completed")}:
              <div className="animate-pulse ml-1 h-4 bg-gray-300 rounded w-10"></div>
            </p>
          </div>
        </GlassCard>
      </div>
    );
  } else {
    return (
      <div>
        <GlassCard className="p-4 m-4">
          <div className="flex flex-col">
            <h2>{t("tasks")}</h2>
            <p>
              {t("completed")}: {completedTasks}/{numberOfTasks} (
              {completedPercent}%)
            </p>
          </div>
        </GlassCard>
      </div>
    );
  }
}
