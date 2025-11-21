import { Outlet } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Sidebar } from "./components/layout/Sidebar";
import { MobileMenuButton } from "./components/button/MobileMenuButton";
import { useState } from "react";

export const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="text-primary flex h-dvh flex-col overflow-hidden">
      <Header />
      <main className="flex grow flex-row relative min-h-0">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          setSidebarOpen={setSidebarOpen}
        />
        <MobileMenuButton onClick={() => setSidebarOpen(true)} />
        <section className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </section>
      </main>
      <Footer />
    </div>
  );
}