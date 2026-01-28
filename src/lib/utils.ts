export function isSameDay(timestamp1: number, timestamp2: number) {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function formatEventDate(timestamp: number): string {
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ).getTime();

  if (isSameDay(timestamp, todayStart)) {
    return "today";
  }

  const tomorrowStart = todayStart + 24 * 60 * 60 * 1000;
  if (isSameDay(timestamp, tomorrowStart)) {
    return "tomorrow";
  }

  const dayAfterStart = todayStart + 2 * 24 * 60 * 60 * 1000;
  if (isSameDay(timestamp, dayAfterStart)) {
    return "dayAfter";
  }

  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function getWeekStartTimestamp(): number {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const weekStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + diffToMonday,
  );

  return weekStart.getTime();
}

export function getWeekEndTimestamp(weekStartTimestamp: number): number {
  const weekStart = new Date(weekStartTimestamp);

  const weekEnd = new Date(
    weekStart.getFullYear(),
    weekStart.getMonth(),
    weekStart.getDate() + 7,
  );

  return weekEnd.getTime();
}
