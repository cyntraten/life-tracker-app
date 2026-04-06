import { useTranslation } from "react-i18next";
import { getAverageHabitsStreak } from "../../lib/stats";
import { GlassCard } from "../ui/GlassCard";
import useHabitStore from "../../store/useHabitStore";

export default function HabitsStats() {
  const { habits } = useHabitStore();
  const { t } = useTranslation();
  const averageHabitsStreak = getAverageHabitsStreak(habits);

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
