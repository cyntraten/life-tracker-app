type Props = {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
};

export default function HabitProgressCircle({
  value,
  size = 64,
  strokeWidth = 6,
  color = "stroke-blue-500",
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(Math.max(value, 0), 100) / 100);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="-rotate-90 w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="stroke-gray-200"
          strokeWidth={strokeWidth}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />

        <circle
          className={`${color} transition-all`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <span className="absolute text-sm font-medium">{Math.round(value)}%</span>
    </div>
  );
}
