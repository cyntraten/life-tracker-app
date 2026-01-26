import { create } from "zustand";

export interface Task {
  id: string;
  title: string;
  done: boolean;
  timestamp: number;
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  lastCompleted: number;
  progressPercent: number;
}

type State = {
  tasks: Task[];
  habits: Habit[];
};

type Action = {
  addTask: (task: Task) => void;
  addHabit: (habit: Habit) => void;
  toggleTask: (id: string) => void;
  doneHabit: (id: string, timestamp: number) => void;
  cancelHabit: (id: string) => void;
};

// timestamps for testing
const now = new Date();
const todayStart = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
).getTime();
const tomorrowStart = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() + 1,
).getTime();
const dayAfterStart = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() + 2,
).getTime();

const useLifeStore = create<State & Action>()((set) => ({
  tasks: [
    {
      id: "t1",
      title: "Купить продукты",
      done: false,
      timestamp: todayStart,
    },
    {
      id: "t2",
      title: "Позвонить врачу",
      done: true,
      timestamp: todayStart,
    },
    {
      id: "t3",
      title: "Сделать презентацию",
      done: false,
      timestamp: tomorrowStart,
    },
    {
      id: "t4",
      title: "Отправить отчёт",
      done: false,
      timestamp: dayAfterStart,
    },
  ],
  habits: [
    {
      id: "h1",
      name: "Привычка 1",
      streak: 22,
      lastCompleted: todayStart - 24 * 3600 * 1000,
      progressPercent: 33,
    },
    {
      id: "h2",
      name: "Привычка 2",
      streak: 11,
      lastCompleted: todayStart,
      progressPercent: 16,
    },
    {
      id: "h3",
      name: "Привычка 3",
      streak: 0,
      lastCompleted: 0,
      progressPercent: 0,
    },
  ],
  addTask: (task: Task) => set((state) => ({ tasks: [...state.tasks, task] })),
  toggleTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    })),
  addHabit: (habit: Habit) =>
    set((state) => ({ habits: [...state.habits, habit] })),
  doneHabit: (id: string, timestamp: number) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              streak: habit.streak + 1,
              lastCompleted: timestamp,
              progressPercent: Math.floor((habit.streak + 1) / 0.66),
            }
          : habit,
      ),
    })),
  cancelHabit: (id: string) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              streak: Math.max(habit.streak - 1, 0),
              lastCompleted: 0,
              progressPercent: Math.max(
                Math.floor((habit.streak - 1) / 0.66),
                0,
              ),
            }
          : habit,
      ),
    })),
}));

export default useLifeStore;
