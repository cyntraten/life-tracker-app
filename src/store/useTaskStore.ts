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

export interface Task {
  id: string;
  title: string;
  done: boolean;
  timestamp: number;
}

interface Actions {
  loadTasksFromDB: () => Promise<void>;
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (id: string) => void;
  addTaskToDB: (task: Task) => Promise<void>;
  updateTaskFromDB: (id: string, updatedData: Partial<Task>) => Promise<void>;
  deleteTaskFromDB: (id: string) => Promise<void>;
}
type State = {
  tasks: Task[];
  loadingTasks: boolean;
};

type TaskStore = State & Actions;

const useTaskStore = create<TaskStore>()((set) => ({
  loadTasksFromDB: async () => {
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to load tasks from DB");
      const tasks: Task[] = await res.json();
      set({ tasks, loadingTasks: false });
    } catch (err: any) {
      console.error(err);
    }
  },
  loadingTasks: true,
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
  addTask: (task: Task) => set((state) => ({ tasks: [...state.tasks, task] })),
  toggleTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    })),
  updateTask: (updatedTask: Task) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    })),
  deleteTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  addTaskToDB: async (task: Task) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error("Failed to add task to DB");
      const createdTask: Task = await res.json();
      useTaskStore.getState().addTask(createdTask);
    } catch (err: any) {
      console.error(err);
    }
  },
  updateTaskFromDB: async (id: string, updatedData: Partial<Task>) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Failed to update task in DB");
      const updatedTask: Task = await res.json();
      useTaskStore.getState().updateTask(updatedTask);
    } catch (err: any) {
      console.error(err);
    }
  },
  deleteTaskFromDB: async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task from DB");
      useTaskStore.getState().deleteTask(id);
    } catch (err: any) {
      console.error(err);
    }
  },
}));

export default useTaskStore;
