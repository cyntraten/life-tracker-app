import { useTranslation } from "react-i18next";
import { GlassCard } from "../components/ui/GlassCard";
import HabitForm from "../components/habits/HabitForm";
import HabitsList from "../components/habits/HabitsList";

export default function HabitsPage() {
  const { t } = useTranslation();
  return (
    <div className="mt-2">
      <GlassCard className="p-4">
        <h1 className="text-2xl font-medium mb-4">{t("addHabit")}</h1>
        <HabitForm />
      </GlassCard>

      <GlassCard className="p-4 mt-4">
        <h2 className="text-2xl font-medium mb-4">{t("habits")}</h2>
        <HabitsList />
      </GlassCard>
    </div>
  );
}
