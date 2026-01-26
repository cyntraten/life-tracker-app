import { Route, Routes } from "react-router";
import DashboardPage from "./pages/DashboardPage";
import { AppLayout } from "./components/layout/AppLayout";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/habits" element={<DashboardPage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/mood" element={<DashboardPage />} />
        <Route path="/journal" element={<DashboardPage />} />
        <Route path="/stats" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
