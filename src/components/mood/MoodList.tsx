import { useTranslation } from "react-i18next";
import { getWeekEndTimestamp, getWeekStartTimestamp } from "../../lib/utils";
import useMoodStore from "../../store/useMoodStore";
import { GlassCard } from "../ui/GlassCard";
import { useEffect } from "react";

export default function MoodList() {
  const { moods, loadingMoods, loadMoodsFromDB } = useMoodStore();
  const { t } = useTranslation();

  const MOODS = ["", "😞", "😕", "😐", "🙂", "😊"];

  const weekMoods = Array(7).fill(null);

  const weekStart = getWeekStartTimestamp();
  const weekEnd = getWeekEndTimestamp(weekStart);

  function getWeekDayIndex(timestamp: number) {
    const day = new Date(timestamp).getDay();
    return day === 0 ? 6 : day - 1;
  }

  useEffect(() => {
    loadMoodsFromDB();
  }, [loadMoodsFromDB]);

  moods
    .filter((m) => m.timestamp >= weekStart && m.timestamp < weekEnd)
    .forEach((mood) => {
      const index = getWeekDayIndex(mood.timestamp);
      weekMoods[index] = mood;
    });

  if (loadingMoods) {
    return (
      <div className="mt-6">
        <GlassCard className="p-4">
          <h2 className="font-medium mb-3">Последние 7 дней</h2>
          <div className="grid grid-cols-7 gap-1 text-center">
            <div className="animate-pulse">
              <div className="flex-col items-center justify-between">
                <div className="mt-4 h-4 bg-gray-300 rounded w-full"></div>
                <div className="mt-4 h-4 bg-gray-300 rounded w-full"></div>
                <div className="mt-4 h-4 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    );
  }

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
