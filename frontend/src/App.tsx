import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Sidebar } from "./components/Sidebar";
import { MobileMenuButton } from "./components/button/MobileMenuButton";
import { useState } from "react";

export const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="text-primary flex h-dvh flex-col ">
      <Header />
      <main className="flex grow flex-row relative">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          setSidebarOpen={setSidebarOpen}
        />
        <MobileMenuButton onClick={() => setSidebarOpen(true)} />
        <section className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto ">
          <Outlet />
        </section>
      </main>
      <Footer />
    </div>
  );
}