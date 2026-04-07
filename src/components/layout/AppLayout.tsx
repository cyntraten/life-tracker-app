import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import useTaskStore from "../../store/useTaskStore";
import useHabitStore from "../../store/useHabitStore";
import useMoodStore from "../../store/useMoodStore";

export const AppLayout = () => {
  const { loadTasksFromDB } = useTaskStore();
  const { loadHabitsFromDB } = useHabitStore();
  const { loadMoodsFromDB } = useMoodStore();

  useEffect(() => {
    loadTasksFromDB();
    loadHabitsFromDB();
    loadMoodsFromDB();
  }, [loadTasksFromDB, loadHabitsFromDB, loadMoodsFromDB]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col items-center flex-1 overflow-auto mr-2 w-full">
        <main className="w-full mt-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
