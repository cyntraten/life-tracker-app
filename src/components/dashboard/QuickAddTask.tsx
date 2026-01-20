import { useTranslation } from "react-i18next";
import { GlassCard } from "../ui/GlassCard";
import { useState } from "react";
import useLifeStore from "../../store/useLifeStore";

export default function QuickAddTask() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const addTask = useLifeStore((state) => state.addTask);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      const currentDate = Date.now().toString();
      addTask({
        id: crypto.randomUUID(),
        title: input,
        done: false,
        date: currentDate,
      });
      setInput("");
    }
  };

  return (
    <GlassCard className="p-4">
      <input
        type="text"
        placeholder={t("quickAddTaskPlaceholder")}
        className="w-full bg-transparent outline-none placeholder-gray-400 text-lg"
        onKeyDown={handleKeyDown}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </GlassCard>
  );
}
