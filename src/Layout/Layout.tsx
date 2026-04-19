import Footer from "./Footer";
import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";
import NavbarTwo from "./NavbarTwo";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <NavbarTwo />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;