import HabitsStats from "../components/stats/HabitsStats";
import MoodsStats from "../components/stats/MoodsStats";
import TasksStats from "../components/stats/TasksStats";
import { GlassCard } from "../components/ui/GlassCard";

export default function StatsPage() {
  return (
    <div className="w-full h-full">
      <GlassCard className="flex flex-col p-6">
        <TasksStats />
        <HabitsStats />
        <MoodsStats />
      </GlassCard>
    </div>
  );
}
