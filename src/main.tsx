import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { AppLayout } from "./components/layout/AppLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/habits" element={<App />} />
          <Route path="/tasks" element={<App />} />
          <Route path="/mood" element={<App />} />
          <Route path="/journal" element={<App />} />
          <Route path="/stats" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
