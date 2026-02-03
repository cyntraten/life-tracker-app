import { Route, Routes } from "react-router";
import DashboardPage from "./pages/DashboardPage";
import { AppLayout } from "./components/layout/AppLayout";
import TaskPage from "./pages/TaskPage";
import HabitsPage from "./pages/HabitsPage";
import MoodPage from "./pages/MoodPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/habits" element={<HabitsPage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/mood" element={<MoodPage />} />
        <Route path="/journal" element={<DashboardPage />} />
        <Route path="/stats" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
