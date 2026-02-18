import type { Habit, Mood, Task } from "../store/useLifeStore";

export function getAverageHabitsStreak(habits: Habit[]): number {
  const numberOfHabits = habits.length;
  let habitsStreak = 0;
  for (let habit of habits) {
    habitsStreak += habit.streak;
  }

  return Math.floor(habitsStreak / numberOfHabits);
}

export function getAverageMood(moods: Mood[]): number {
  const allMoods = moods.length - 1;
  let moodsSum = 0;
  for (let mood of moods) {
    moodsSum += mood.mood;
  }

  return Math.floor(moodsSum / allMoods);
}

function getCompletedTasks(tasks: Task[]): number {
  let completedTasks = 0;
  for (const task of tasks) {
    if (task.done) completedTasks++;
  }

  return completedTasks;
}

function getCompletedPercentTasks(
  completedTasks: number,
  numberOfTasks: number,
): number {
  return Math.floor(completedTasks / (numberOfTasks / 100));
}

export function getTasksStats(tasks: Task[]) {
  const numberOfTasks = tasks.length;
  const completedTasks = getCompletedTasks(tasks);
  const completedPercent = getCompletedPercentTasks(
    completedTasks,
    numberOfTasks,
  );

  return { numberOfTasks, completedTasks, completedPercent };
}
