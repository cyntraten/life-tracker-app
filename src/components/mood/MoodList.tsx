import { useTranslation } from "react-i18next";
import { getWeekEndTimestamp, getWeekStartTimestamp } from "../../lib/utils";
import useLifeStore from "../../store/useLifeStore";
import { GlassCard } from "../ui/GlassCard";

export default function MoodList() {
  const { moods } = useLifeStore();
  const { t } = useTranslation();

  const MOODS = ["", "😞", "😕", "😐", "🙂", "😊"];

  const weekMoods = Array(7).fill(null);

  const weekStart = getWeekStartTimestamp();
  const weekEnd = getWeekEndTimestamp(weekStart);

  function getWeekDayIndex(timestamp: number) {
    const day = new Date(timestamp).getDay();
    return day === 0 ? 6 : day - 1;
  }

  moods
    .filter((m) => m.timestamp >= weekStart && m.timestamp < weekEnd)
    .forEach((mood) => {
      const index = getWeekDayIndex(mood.timestamp);
      weekMoods[index] = mood;
    });

  return (
    <div className="mt-6">
      <GlassCard className="p-4">
        <h2 className="font-medium mb-3">Последние 7 дней</h2>
        <div className="grid grid-cols-7 gap-1 text-center">
          {[
            t("monday"),
            t("tuesday"),
            t("wednesday"),
            t("thursday"),
            t("friday"),
            t("saturday"),
            t("sunday"),
          ].map((day, i) => (
            <div key={day} className="flex flex-col items-center">
              <span className="text-xs ">{day}</span>
              <span className="text-2xl mt-1 ">
                {weekMoods[i] ? MOODS[weekMoods[i].mood] : "_"}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
