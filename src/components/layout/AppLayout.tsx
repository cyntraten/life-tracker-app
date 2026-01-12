import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-16 md:w-60 p-6">Sidebar</div>

      <div className="flex flex-col items-center flex-1 overflow-hidden">
        <header className="h-16 flex items-center px-6 mb-10">
          <h1 className="text-xl font-semibold">Main</h1>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
