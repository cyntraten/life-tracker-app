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
  doneToday: boolean;
}

type State = {
  tasks: Task[];
  habits: Habit[];
};

type Action = {
  addTask: (task: Task) => void;
  addHabit: (habit: Habit) => void;
};

const useLifeStore = create<State & Action>()((set) => ({
  tasks: [],
  habits: [],
  addTask: (task: Task) => set((state) => ({ tasks: [...state.tasks, task] })),
  addHabit: (habit: Habit) =>
    set((state) => ({ habits: [...state.habits, habit] })),
}));

export default useLifeStore;
