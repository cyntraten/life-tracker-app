import { useTranslation } from "react-i18next";
import useLifeStore from "../../store/useLifeStore";
import HabitItem from "../dashboard/habit/HabitItem";
import { useCallback } from "react";

export default function HabitsList() {
  const { habits, cancelHabit, doneHabit } = useLifeStore();
  const { t } = useTranslation();
  const todayTimestamp = Date.now();

  const sortedHabits = [...habits].sort(
    (t1, t2) => t1.lastCompleted - t2.lastCompleted,
  );

  if (sortedHabits.length === 0) {
    return <p className="text-gray-500">{t("emptyTasksList")}</p>;
  }

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
          />
        ))}
      </div>
    </div>
  );
}
