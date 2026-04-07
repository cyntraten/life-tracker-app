import { useTranslation } from "react-i18next";
import { getAverageHabitsStreak } from "../../lib/stats";
import { GlassCard } from "../ui/GlassCard";
import useHabitStore from "../../store/useHabitStore";

export default function HabitsStats() {
  const { habits, loadingHabits } = useHabitStore();
  const { t } = useTranslation();
  const averageHabitsStreak = getAverageHabitsStreak(habits);

  if (loadingHabits) {
    return (
      <div>
        <GlassCard className="p-4 m-4">
          <div className="flex flex-col">
            <h2>{t("habits")}</h2>
            <p className="flex items-center">
              {t("averageStreak")}:
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
            <h2>{t("habits")}</h2>
            <p>
              {t("averageStreak")}: {averageHabitsStreak}
            </p>
          </div>
        </GlassCard>
      </div>
    );
  }
}
