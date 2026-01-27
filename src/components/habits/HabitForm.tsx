import { useState } from "react";
import useLifeStore, { type Habit } from "../../store/useLifeStore";
import { useTranslation } from "react-i18next";

export default function HabitForm() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const { t } = useTranslation();

  const { addHabit } = useLifeStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    const habit: Habit = {
      id: crypto.randomUUID(),
      name: title.trim(),
      streak: 0,
      lastCompleted: 0,
      progressPercent: 0,
    };

    addHabit(habit);
    setTitle("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t("habit")}
        className="w-full bg-transparent outline-none placeholder-gray-400 py-2"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        {t("addHabit")}
      </button>
    </form>
  );
}
