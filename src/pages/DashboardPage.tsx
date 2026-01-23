import DashboardHello from "../components/dashboard/DashboardHello";
import HabitsProgress from "../components/dashboard/HabitsProgress";
import QuickAddTask from "../components/dashboard/QuickAddTask";
import TodayTasks from "../components/dashboard/TodayTasks";
import UpcomingEvents from "../components/dashboard/UpcomingEvents";
import { GlassCard } from "../components/ui/GlassCard";

export default function DashboardPage() {
  return (
    <div className="w-full h-full">
      <div>
        <DashboardHello />
      </div>
      <GlassCard className="flex flex-col mt-2 w-full p-6">
        <QuickAddTask />
        <TodayTasks />
        <HabitsProgress />
        <UpcomingEvents />
      </GlassCard>
    </div>
  );
}
