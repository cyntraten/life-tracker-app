import { useTranslation } from "react-i18next";
import { getAverageMood } from "../../lib/stats";
import { GlassCard } from "../ui/GlassCard";
import useMoodStore from "../../store/useMoodStore";

const MOODS = ["", "😞", "😕", "😐", "🙂", "😊"];

export default function MoodsStats() {
  const { moods, loadingMoods } = useMoodStore();
  const averageMood = getAverageMood(moods);
  const { t } = useTranslation();

  if (loadingMoods) {
    return (
      <div>
        <GlassCard className="p-4 m-4">
          <div className="flex flex-col">
            <h2>{t("moods")}</h2>
            <p className="flex items-center">
              {t("weeklyMoodAverage")}:
              <div className="animate-pulse ml-1 h-4 bg-gray-300 rounded w-10"></div>
            </p>
          </div>
        </GlassCard>
      </div>
    );
  } else {
    return (
      <div>
        <GlassCard className="p-4 m-4">
          <div className="flex flex-col">
            <h2>{t("mood")}</h2>
            <p>
              {t("weeklyMoodAverage")}: {MOODS[averageMood]}
            </p>
          </div>
        </GlassCard>
      </div>
    );
  }
}
