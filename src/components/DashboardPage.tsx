import { GlassCard } from "./ui/GlassCard";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const { t } = useTranslation();
  const currentDate = new Date();

  const optionsRu: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  const formattedDate = currentDate.toLocaleDateString(t("locale"), optionsRu);

  const capitalizedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <GlassCard className="w-full h-full items-center text-center p-6">
      <h2>{t("hello")}, Name</h2>
      <p>{capitalizedDate}</p>
    </GlassCard>
  );
}
