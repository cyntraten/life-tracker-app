import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <>
      <header>
        <h1>Header</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <h4>Footer</h4>
      </footer>
    </>
  );
};
