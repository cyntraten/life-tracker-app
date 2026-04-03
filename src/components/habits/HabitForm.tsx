import { useState } from "react";
import { useTranslation } from "react-i18next";
import useHabitStore, { type Habit } from "../../store/useHabitStore";

export default function HabitForm() {
  const [title, setTitle] = useState("");

  const { t } = useTranslation();

  const { addHabitToDB } = useHabitStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const habit: Habit = {
      id: crypto.randomUUID(),
      name: title.trim(),
      streak: 0,
      lastCompleted: 0,
      progressPercent: 0,
    };
    await addHabitToDB(habit);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t("habit")}
        className="w-full bg-transparent outline-none placeholder-gray-400 py-2"
        name="habitName"
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
