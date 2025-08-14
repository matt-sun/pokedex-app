import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Layout() {
  return (
    <div className="font-pokemon min-h-screen bg-gray-200 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="mx-4 mt-4 pb-4 flex-1 flex flex-col items-center dark:text-gray-200">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
