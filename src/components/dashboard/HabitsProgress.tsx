import { useEffect, useCallback } from "react";
import useHabitStore from "../../store/useHabitStore";
import { GlassCard } from "../ui/GlassCard";
import HabitItem from "./habit/HabitItem";

export default function HabitsProgress() {
  const {
    habits,
    loadHabitsFromDB,
    loadingHabits,
    doneHabitFromDB,
    cancelHabitFromDB,
  } = useHabitStore();

  const todayTimestamp = Date.now();

  const hasHabits = habits.length > 0;

  const handleCheckboxChange = useCallback(
    (habitId: string, isDoneToday: boolean) => {
      if (isDoneToday) {
        cancelHabitFromDB(habitId, habits.find((h) => h.id === habitId)!);
        return;
      }
      doneHabitFromDB(habitId, habits.find((h) => h.id === habitId)!);
    },
    [cancelHabitFromDB, doneHabitFromDB, habits],
  );

  useEffect(() => {
    loadHabitsFromDB();
  }, [loadHabitsFromDB]);

  return (
    <GlassCard className="p-4 mt-4">
      <h3 className="font-medium text-4xl mb-3 px-2">Привычки</h3>
      {!hasHabits ? (
        <p className="text-gray-500 text-2xl px-2">Нет активных привычек</p>
      ) : loadingHabits ? (
        <div className="font-medium p-4">
          <div className="mt-3">
            <div className="animate-pulse">
              <div className="flex-col items-center justify-between">
                <div className="mt-4 w-5 h-5 bg-gray-300 rounded w-full"></div>
                <div className="mt-4 w-5 h-5 bg-gray-300 rounded w-full"></div>
                <div className="mt-4 w-5 h-5 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="font-medium p-4">
          {habits.map((habit) => {
            return (
              <HabitItem
                key={habit.id}
                name={habit.name}
                todayTimestamp={todayTimestamp}
                checkboxToggle={handleCheckboxChange}
                lastCompleted={habit.lastCompleted}
                habitId={habit.id}
                progressPercent={habit.progressPercent}
                updatedData={{
                  id: habit.id,
                  name: habit.name,
                  lastCompleted: habit.lastCompleted,
                  streak: habit.streak,
                  progressPercent: habit.progressPercent,
                }}
              />
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}
