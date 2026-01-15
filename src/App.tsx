import { Route, Routes } from "react-router";
import DashboardPage from "./pages/DashboardPage";
import { AppLayout } from "./components/layout/AppLayout";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/habits" element={<DashboardPage />} />
        <Route path="/tasks" element={<DashboardPage />} />
        <Route path="/mood" element={<DashboardPage />} />
        <Route path="/journal" element={<DashboardPage />} />
        <Route path="/stats" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
