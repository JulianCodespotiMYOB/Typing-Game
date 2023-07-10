import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
