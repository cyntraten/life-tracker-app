import { create } from "zustand";

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

export interface Mood {
  id: string;
  note?: string;
  mood: number;
  timestamp: number;
}

type State = {
  moods: Mood[];
  loadingMoods: boolean;
};

interface Actions {
  loadMoodsFromDB: () => Promise<void>;
  addMood: (mood: Mood) => void;
  updateMood: (mood: Mood) => void;
  addMoodToDB: (mood: Mood) => Promise<void>;
  deleteMood: (id: string) => void;
  updateMoodFromDB: (id: string, updatedData: Partial<Mood>) => Promise<void>;
  deleteMoodFromDB: (id: string) => Promise<void>;
}

type MoodStore = State & Actions;

const useMoodStore = create<MoodStore>()((set) => ({
  loadingMoods: true,
  moods: [
    {
      id: "m1",
      note: "Круто",
      mood: 5,
      timestamp: todayStart,
    },
    {
      id: "m2",
      note: "Плохо",
      mood: 1,
      timestamp: tomorrowStart,
    },
    {
      id: "m3",
      note: "Средне",
      mood: 3,
      timestamp: dayAfterStart,
    },
  ],

  loadMoodsFromDB: async () => {
    try {
      const res = await fetch("/api/moods");
      if (!res.ok) throw new Error("Failed to fetch from DB");
      const moods: Mood[] = await res.json();
      set({ moods, loadingMoods: false });
    } catch (err: any) {
      console.error(err);
    }
  },
  addMood: (mood: Mood) => set((state) => ({ moods: [...state.moods, mood] })),
  updateMood: (mood: Mood) =>
    set((state) => ({
      moods: state.moods.map((m) =>
        m.id === mood.id
          ? {
              ...m,
              mood: mood.mood,
              note: mood.note,
            }
          : m,
      ),
    })),
  deleteMood: (id: string) =>
    set((state) => ({
      moods: state.moods.filter((mood) => mood.id !== id),
    })),
  addMoodToDB: async (mood: Mood) => {
    try {
      const res = await fetch("/api/moods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mood),
      });
      if (!res.ok) throw new Error("Failed to add mood to DB");
      const createdMood: Mood = await res.json();
      useMoodStore.getState().addMood(createdMood);
    } catch (err: any) {
      console.error(err);
    }
  },

  updateMoodFromDB: async (id: string, updatedData: Partial<Mood>) => {
    try {
      const res = await fetch(`/api/moods/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Failed to update mood in DB");
      const updatedMood: Mood = await res.json();
      useMoodStore.getState().updateMood(updatedMood);
    } catch (err: any) {
      console.error(err);
    }
  },
  deleteMoodFromDB: async (id: string) => {
    try {
      const res = await fetch(`/api/moods/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task from DB");
      useMoodStore.getState().deleteMood(id);
    } catch (err: any) {
      console.error(err);
    }
  },
}));

export default useMoodStore;
