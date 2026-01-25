import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

export const AppLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col items-center flex-1 overflow-auto mr-2 w-full">
        <main className="w-full mt-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
