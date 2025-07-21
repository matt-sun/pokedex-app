import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Layout() {
  return (
    <div className="font-pokemon flex min-h-screen flex-col bg-gray-200">
      <Header />
      <main className="grow mx-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
