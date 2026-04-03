import { useTranslation } from "react-i18next";
import HabitItem from "../dashboard/habit/HabitItem";
import { useCallback, useEffect, useMemo } from "react";
import useHabitStore from "../../store/useHabitStore";
import type { Habit } from "../../store/useLifeStore";

export default function HabitsList() {
  const {
    habits,
    cancelHabitFromDB,
    doneHabitFromDB,
    loadHabitsFromDB,
    loadingHabits,
  } = useHabitStore();
  const { t } = useTranslation();
  const todayTimestamp = useMemo(() => Date.now(), []);

  const handleCheckboxChange = useCallback(
    (habitId: string, isDoneToday: boolean, updatedData: Habit) => {
      if (isDoneToday) {
        cancelHabitFromDB(habitId, updatedData);
        return;
      }
      doneHabitFromDB(habitId, updatedData);
    },
    [cancelHabitFromDB, doneHabitFromDB, todayTimestamp],
  );

  const sortedHabits = [...habits].sort(
    (t1, t2) => t1.lastCompleted - t2.lastCompleted,
  );

  useEffect(() => {
    loadHabitsFromDB();
  }, [loadHabitsFromDB]);

  if (sortedHabits.length === 0) {
    return <p className="text-gray-500">{t("emptyTasksList")}</p>;
  }

  if (loadingHabits) {
    return (
      <div className="mt-3">
        <div className="animate-pulse">
          <div className="flex-col items-center justify-between">
            <div className="mt-4 h-4 bg-gray-300 rounded w-full"></div>
            <div className="mt-4 h-4 bg-gray-300 rounded w-full"></div>
            <div className="mt-4 h-4 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <div>
        {sortedHabits.map((habit) => (
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
        ))}
      </div>
    </div>
  );
}
