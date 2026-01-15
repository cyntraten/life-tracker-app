import DashboardHello from "../components/dashboard/DashboardHello";
import QuickAddTask from "../components/dashboard/QuickAddTask";
import { GlassCard } from "../components/ui/GlassCard";

export default function DashboardPage() {
  return (
    <div className="w-full h-full">
      <div>
        <DashboardHello />
      </div>
      <GlassCard className="flex flex-col mt-2 w-full p-6">
        <QuickAddTask />
      </GlassCard>
    </div>
  );
}
