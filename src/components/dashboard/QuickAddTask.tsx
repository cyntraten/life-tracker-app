import { useTranslation } from "react-i18next";
import { GlassCard } from "../ui/GlassCard";

export default function QuickAddTask() {
  const { t } = useTranslation();
  return (
    <GlassCard className="p-4">
      <input
        type="text"
        placeholder={t("quickAddTaskPlaceholder")}
        className="w-full bg-transparent outline-none placeholder-gray-400 text-lg"
      />
    </GlassCard>
  );
}
