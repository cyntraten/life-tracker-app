import { useEffect, useState } from "react";
import { GlassCard } from "../ui/GlassCard";
import useMoodStore from "../../store/useMoodStore";

const MOODS = [
  { emoji: "😞", label: "Очень плохо", number: 1 },
  { emoji: "😕", label: "Плохо", number: 2 },
  { emoji: "😐", label: "Нейтрально", number: 3 },
  { emoji: "🙂", label: "Хорошо", number: 4 },
  { emoji: "😊", label: "Отлично", number: 5 },
];

export default function SelectMood() {
  const [selectedMood, setSelectedMood] = useState(0);
  const [note, setNote] = useState("");
  const { moods, addMoodToDB, updateMoodFromDB } = useMoodStore();

  const currentTime = new Date();
  const currentTimestamp = currentTime.getTime();

  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ).getTime();
  const dayEnd = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
  ).getTime();

  useEffect(() => {
    const todayMood = moods.find(
      (mood) => mood.timestamp >= todayStart && mood.timestamp < dayEnd,
    );
    if (todayMood) {
      setSelectedMood(todayMood.mood);
      setNote(todayMood.note ?? "");
    }
  }, [moods]);

  const handleSave = () => {
    const todayMood = moods.find(
      (mood) => mood.timestamp >= todayStart && mood.timestamp < dayEnd,
    );
    const updatedMood = {
      ...todayMood,
      mood: selectedMood,
      note,
    };

    if (todayMood) {
      updateMoodFromDB(todayMood.id, updatedMood);
    } else {
      addMoodToDB({
        id: crypto.randomUUID(),
        mood: selectedMood,
        note,
        timestamp: currentTimestamp,
      });
    }
  };

  return (
    <GlassCard className="p-6">
      <h1 className="text-2xl font-medium mb-6">Как вы себя чувствуете?</h1>

      <div className="flex mb-8">
        {MOODS.map((mood) => (
          <button
            key={mood.number}
            className="text-3xl transition-transform hover:scale-110 mr-4"
            aria-label={mood.label}
            onClick={() => setSelectedMood(mood.number)}
          >
            {mood.emoji}
          </button>
        ))}
      </div>

      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Что повлияло на ваше настроение?"
        className="w-full bg-transparent border-b py-2 outline-none"
      />

      <button
        disabled={!selectedMood}
        onClick={handleSave}
        className="mt-6 px-4 py-2 rounded bg-blue-600 text-white disabled:bg-gray-400"
      >
        {moods.some((m) => m.timestamp >= todayStart && m.timestamp < dayEnd)
          ? "Обновить"
          : "Сохранить"}
      </button>
    </GlassCard>
  );
}
