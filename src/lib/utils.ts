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

  return "soon";
}
