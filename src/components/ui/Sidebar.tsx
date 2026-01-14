import { NavLink } from "react-router";
import { GlassCard } from "./GlassCard";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { t } = useTranslation();

  const navItems = [
    { path: "/", label: t("dashboard"), icon: "🏠" },
    { path: "/tasks", label: t("tasks"), icon: "✅" },
    { path: "/habits", label: t("habits"), icon: "🔁" },
    { path: "/mood", label: t("mood"), icon: "😊" },
    { path: "/journal", label: t("journal"), icon: "📓" },
    { path: "/stats", label: t("stats"), icon: "📊" },
  ];

  return (
    <GlassCard
      className="w-16 md:w-60 flex flex-col self-center items-center justify-center md:items-start py-6 m-2 space-y-2 z-10 max-h-screen"
      border={true}
      rounded={true}
    >
      <nav className="flex flex-col items-center md:items-start w-full px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center md:w-full p-3 rounded-xl transition-all mt-2
              ${
                isActive
                  ? "bg-white/30 dark:bg-gray-700/40 text-blue-600 dark:text-blue-300"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 hover:dark:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-700/30"
              }`
            }
            title={item.label}
          >
            <span className="text-xl">{item.icon}</span>

            <span className="ml-4 hidden md:block font-medium">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </GlassCard>
  );
}
