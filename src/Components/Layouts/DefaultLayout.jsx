/* eslint-disable react/prop-types */
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top
  }, [pathname]);

  return null;
};

function DefaultLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
}

export default DefaultLayout;
