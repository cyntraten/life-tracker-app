import { useCallback } from "react";
import useLifeStore from "../../store/useLifeStore";
import { GlassCard } from "../ui/GlassCard";
import HabitItem from "./habit/HabitItem";

export default function HabitsProgress() {
  const { habits, doneHabit, cancelHabit } = useLifeStore();

  const todayTimestamp = Date.now();

  const hasHabits = habits.length > 0;

  const handleCheckboxChange = useCallback(
    (habitId: string, isDoneToday: boolean) => {
      if (isDoneToday) {
        cancelHabit(habitId);
        return;
      }
      doneHabit(habitId, todayTimestamp);
    },
    [cancelHabit, doneHabit],
  );

  return (
    <GlassCard className="p-4 mt-4">
      <h3 className="font-medium text-4xl mb-3 px-2">Привычки</h3>
      {hasHabits ? (
        <p className="text-gray-500 text-2xl px-2">Нет активных привычек</p>
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
              />
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}
