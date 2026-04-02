import { useState } from "react";
import { useTranslation } from "react-i18next";
import useTaskStore, { type Task } from "../../store/useTaskStore";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const { t } = useTranslation();

  const addTaskToDB = useTaskStore((state) => state.addTaskToDB);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    const selectedDate = new Date(date);
    const timestamp = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
    ).getTime();

    const task: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      done: false,
      timestamp: timestamp,
    };

    await addTaskToDB(task);
    setTitle("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t("taskName")}
        className="w-full bg-transparent outline-none placeholder-gray-400 py-2"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full bg-transparent outline-none py-2"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        {t("addTask")}
      </button>
    </form>
  );
}
