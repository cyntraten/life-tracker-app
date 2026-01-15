import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

export const AppLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col items-center flex-1 overflow-hidden mr-2 w-full">
        <header className="h-16 flex items-center px-6 mb-10">
          <h1 className="text-xl font-semibold">Main</h1>
        </header>
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
