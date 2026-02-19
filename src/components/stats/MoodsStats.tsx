import { useTranslation } from "react-i18next";
import { getAverageMood } from "../../lib/stats";
import useLifeStore from "../../store/useLifeStore";
import { GlassCard } from "../ui/GlassCard";

const MOODS = ["", "😞", "😕", "😐", "🙂", "😊"];

export default function MoodsStats() {
  const { moods } = useLifeStore();
  const averageMood = getAverageMood(moods);
  const { t } = useTranslation();

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
