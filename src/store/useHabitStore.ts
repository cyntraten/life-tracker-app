import { create } from "zustand";

// timestamps for testing
const now = new Date();
const todayStart = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
).getTime();

const calculateProgressPercent = (streak: number): number =>
  Math.min(Math.floor(streak / 0.66), 100);

const updateHabitOnDone = (habit: Habit, timestamp: number): Habit => ({
  ...habit,
  streak: habit.streak + 1,
  lastCompleted: timestamp,
  progressPercent: calculateProgressPercent(Math.max(habit.streak + 1)),
});

const updateHabitOnCancel = (habit: Habit): Habit => ({
  ...habit,
  streak: Math.max(habit.streak - 1, 0),
  lastCompleted: 0,
  progressPercent: calculateProgressPercent(Math.max(habit.streak - 1, 0)),
});

export interface Habit {
  id: string;
  name: string;
  streak: number;
  lastCompleted: number;
  progressPercent: number;
}

interface Actions {
  loadHabitsFromDB: () => Promise<void>;
  addHabitToDB: (habit: Habit) => Promise<void>;
  updateHabitFromDB: (id: string, updatedData: Partial<Habit>) => Promise<void>;
  cancelHabitFromDB: (id: string, updatedData: Habit) => Promise<void>;
  doneHabitFromDB: (id: string, updatedData: Habit) => Promise<void>;
  deleteHabitFromDB: (id: string) => Promise<void>;
  addHabit: (habit: Habit) => void;
  doneHabit: (id: string, timestamp: number) => void;
  cancelHabit: (id: string) => void;
  updateHabit: (updatedHabit: Habit) => void;
  deleteHabit: (id: string) => void;
}

type State = {
  habits: Habit[];
  loadingHabits: boolean;
};

type HabitStore = State & Actions;

const useHabitStore = create<HabitStore>()((set) => ({
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
  loadingHabits: true,
  addHabit: (habit: Habit) =>
    set((state) => ({ habits: [...state.habits, habit] })),
  doneHabit: (id: string) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id ? updateHabitOnDone(habit, Date.now()) : habit,
      ),
    })),
  cancelHabit: (id: string) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id ? updateHabitOnCancel(habit) : habit,
      ),
    })),
  updateHabit: (updatedHabit: Habit) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === updatedHabit.id ? updatedHabit : habit,
      ),
    })),
  loadHabitsFromDB: async () => {
    try {
      const res = await fetch("/api/habits");
      if (!res.ok) throw new Error("Could not fetch habits from databse");
      const habits: Habit[] = await res.json();
      set({ habits, loadingHabits: false });
    } catch (err: any) {
      console.error(err);
    }
  },
  deleteHabit: (id: string) =>
    set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== id),
    })),
  addHabitToDB: async (Habit: Habit) => {
    try {
      const res = await fetch("/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Habit),
      });
      if (!res.ok) throw new Error("Failed to add Habit to DB");
      const createdHabit: Habit = await res.json();
      useHabitStore.getState().addHabit(createdHabit);
    } catch (err: any) {
      console.error(err);
    }
  },

  updateHabitFromDB: async (id: string, updatedData: Partial<Habit>) => {
    try {
      const res = await fetch(`/api/habits/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Failed to update Habit in DB");
      const updatedHabit: Habit = await res.json();
      useHabitStore.getState().updateHabit(updatedHabit);
    } catch (err: any) {
      console.error(err);
    }
  },
  cancelHabitFromDB: async (id: string, updatedData: Habit) => {
    const newDate = updateHabitOnCancel(updatedData);
    try {
      const res = await fetch(`/api/habits/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDate),
      });
      if (!res.ok) throw new Error("Failed to update Habit in DB");
      const updatedHabit: Habit = await res.json();
      useHabitStore.getState().updateHabit(updatedHabit);
    } catch (err: any) {
      console.error(err);
    }
  },
  doneHabitFromDB: async (id: string, updatedData: Habit) => {
    const newDate = updateHabitOnDone(updatedData, Date.now());
    try {
      const res = await fetch(`/api/habits/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDate),
      });
      if (!res.ok) throw new Error("Failed to update Habit in DB");
      const updatedHabit: Habit = await res.json();
      useHabitStore.getState().updateHabit(updatedHabit);
    } catch (err: any) {
      console.error(err);
    }
  },

  deleteHabitFromDB: async (id: string) => {
    try {
      const res = await fetch(`/api/habits/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete habit from DB");
      useHabitStore.getState().deleteHabit(id);
    } catch (err: any) {
      console.error(err);
    }
  },
}));

export default useHabitStore;
