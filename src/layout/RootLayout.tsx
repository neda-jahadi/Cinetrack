import { Outlet } from "react-router-dom";
import Header from "../components/navigation/Header/Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
