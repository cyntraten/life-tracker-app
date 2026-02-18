import { getAverageMood } from "../../lib/stats";
import useLifeStore from "../../store/useLifeStore";
import { GlassCard } from "../ui/GlassCard";

const MOODS = ["", "😞", "😕", "😐", "🙂", "😊"];

export default function MoodsStats() {
  const { moods } = useLifeStore();
  const averageMood = getAverageMood(moods);

  return (
    <div>
      <GlassCard className="p-4 m-4">
        <div className="flex flex-col">
          <h2>Настроение</h2>
          <p>Среднее за неделю: {MOODS[averageMood]}</p>
        </div>
      </GlassCard>
    </div>
  );
}
