/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top
  }, [pathname]);

  return null;
};

// function DefaultLayout() {
//   return (
//     <>
//       <ScrollToTop />
//       <Navbar />
//       <Sidebar />
//       <Outlet />
//       <Footer />
//     </>
//   );
// }

function DefaultLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
