import { useTranslation } from "react-i18next";
import { formatEventDate } from "../../lib/utils";
import useLifeStore from "../../store/useLifeStore";
import { GlassCard } from "../ui/GlassCard";

export default function UpcomingEvents() {
  const { tasks } = useLifeStore();
  const { t } = useTranslation();

  const now = new Date();
  const startOfTomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  ).getTime();
  const startOfThreeDaysLater = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 3,
  ).getTime();

  const upcomingTasks = tasks
    .filter(
      (task) =>
        task.timestamp >= startOfTomorrow &&
        task.timestamp < startOfThreeDaysLater,
    )
    .sort((a, b) => a.timestamp - b.timestamp);

  if (upcomingTasks.length === 0) return null;

  return (
    <GlassCard className="p-4 mt-4">
      <h3 className="font-medium text-4xl mb-3">{t("upcomingEvents")}</h3>
      <div>
        {upcomingTasks.map((task) => (
          <div key={task.id} className="flex justify-between mt-2">
            <span className="text-2xl">{task.title}</span>
            <span className="text-gray-400 text-xl">
              {t(formatEventDate(task.timestamp))}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
