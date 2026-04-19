import NavbarTwo from "@/Layout/NavbarTwo";
import { Outlet } from "react-router-dom";

export default function DashboardLayoutTwo() {
  return (
    <div className="bg-[#060D10] min-h-screen flex flex-col relative overflow-hidden select-none">
      {/* Decorative Glow Background Element */}
      {/* <div
        className="absolute pointer-events-none z-0 opacity-80"
        style={{
          width: '665px',
          height: '665px',
          borderRadius: '50%',
          background: '#011C52',
          filter: 'blur(200px)',
          top: '-200px',
          right: '-200px',
        }}
      /> */}

      <NavbarTwo />
      <div className="grow pt-24 relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
