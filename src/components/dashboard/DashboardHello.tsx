import { useTranslation } from "react-i18next";
import { GlassCard } from "../ui/GlassCard";

export default function DashboardHello() {
  const { t } = useTranslation();
  const currentDate = new Date();

  const optionsDate: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  const formattedDate = currentDate.toLocaleDateString(
    t("locale"),
    optionsDate
  );

  const capitalizedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <GlassCard className="w-full h-full items-start p-2 px-6 flex flex-col">
      <h1 className="p-1">{t("hello")}, Name</h1>
      <GlassCard className="w-auto min-w-20 p-2 mt-2">
        <p className="">{capitalizedDate}</p>
      </GlassCard>
    </GlassCard>
  );
}
