import React from "react";
import HabitProgressCircle from "../../ui/HabitProgressCircle";
import { isSameDay } from "../../../lib/utils";

interface Props {
  lastCompleted: number;
  name: string;
  todayTimestamp: number;
  habitId: string;
  checkboxToggle: (id: string, isDoneToday: boolean) => void;
  progressPercent: number;
}

export default React.memo(function HabitItem({
  name,
  todayTimestamp,
  lastCompleted,
  habitId,
  checkboxToggle,
  progressPercent,
}: Props) {
  const isDoneToday = isSameDay(lastCompleted, todayTimestamp);
  return (
    <div className="flex items-center mt-2">
      <input
        type="checkbox"
        checked={isDoneToday}
        onChange={() => {
          checkboxToggle(habitId, isDoneToday);
        }}
        className="mr-3 w-5 h-5 rounded"
      />
      <HabitProgressCircle
        value={progressPercent}
        color="stroke-red-500"
        size={50}
      />
      <p className="ml-3 text-2xl">{name}</p>
    </div>
  );
});
