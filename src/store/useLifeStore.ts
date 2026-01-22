import { create } from "zustand";

interface Task {
  id: string;
  title: string;
  done: boolean;
  date: string;
}

interface Habit {
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

const useLifeStore = create<State & Action>()((set) => ({
  tasks: [
    { id: "t1", title: "Задача 1", done: false, date: "1769078858742" },
    { id: "t2", title: "Задача 2", done: false, date: "1669078858742" },
  ],
  habits: [
    {
      id: "h1+555",
      name: "Привычка 1",
      streak: 22,
      lastCompleted: 1769078858742,
      progressPercent: 33,
    },
    {
      id: "h2",
      name: "Привычка 2",
      streak: 0,
      lastCompleted: 1669078858742,
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
