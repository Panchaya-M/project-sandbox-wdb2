/* eslint-disable react/prop-types */
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layouts({ children }) {
  return <>
    <Navbar />
    <Sidebar />
    { children }
    <Footer />
  </>;
}

export default Layouts;
