import { useTranslation } from "react-i18next";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import { GlassCard } from "../components/ui/GlassCard";

export default function TaskPage() {
  const { t } = useTranslation();
  return (
    <div className="mt-2">
      <GlassCard className="p-4">
        <h1 className="text-2xl font-medium mb-4">{t("addTask")}</h1>
        <TaskForm />
      </GlassCard>

      <GlassCard className="p-4 mt-4">
        <h2 className="text-2xl font-medium mb-4">Все задачи</h2>
        <TaskList />
      </GlassCard>
    </div>
  );
}
