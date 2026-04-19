import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, Search, X, User, Settings, LogOut } from "lucide-react";
import CommonWrapper from "@/common/CommonWrapper";
import { CHYRIcon } from "@/assets/logo/BrandLogoNew";
import profileImg from "@/assets/profile.png"
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/auth/auth.slice";

const NavbarTwo: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("accessToken");


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/dashboard" },
    { name: "Call Logs", href: "/dashboard/calls-log" },
    { name: "Agents", href: "/dashboard/agents" },
    { name: "Business", href: "/dashboard/business" },
    { name: "Settings", href: "/dashboard/settings" },
    { name: "Pricing", href: "/dashboard/pricing" },
  ];

  const dispatch = useDispatch()

  // ✅ Longest‑match logic – fixes Home overriding subpaths
  const getActiveLinkFromPath = (pathname: string) => {
    if (pathname === "/") return "";

    const matchingLinks = navLinks.filter((link) => {
      if (pathname === link.href) return true;
      if (pathname.startsWith(link.href + "/")) return true;
      return false;
    });

    if (matchingLinks.length === 0) return "";

    const bestMatch = matchingLinks.reduce((prev, current) =>
      current.href.length > prev.href.length ? current : prev,
    );

    return bestMatch.name;
  };

  const activeLink = getActiveLinkFromPath(location.pathname);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-100 transition-all duration-500 ease-in-out ${isScrolled
          ? "py-3 bg-[#0a0a0a]/80 backdrop-blur-[20px] border-b border-white/10 shadow-2xl"
          : "py-6 bg-transparent"
          }`}
      >
        <CommonWrapper className="py-0!">
          <div className="flex items-center justify-between h-16 ">
            {/* Logo */}
            <Link to="/" className="hover:opacity-90 transition-opacity">
              <CHYRIcon />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 bg-[#0F1118] p-2 rounded-full overflow-hidden border border-white/10">
              {navLinks.map((link) => {
                const isActive = activeLink === link.name;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`px-5.75 py-2.5 transition-all duration-500 font-semibold text-[18px] hover:text-white hover:bg-[#27282F] relative group overflow-hidden rounded-full  ${isActive
                      ? " bg-[#27282F] text-white"
                      : "text-white hover:text-black"
                      }`}
                  >
                    <span className="relative z-10 ">{link.name}</span>
                    {/* <div
                      className={`absolute inset-0 transition-all duration-500 ease-out z-0 flex items-center justify-center ${
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    >
                      <svg
                        width="130"
                        height="40"
                        viewBox="0 0 139 43"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-full w-full object-cover scale-100"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M117.5 0C129.374 0 139 9.62588 139 21.5C139 33.3741 129.374 43 117.5 43H50.5C39.3146 43 30.1252 34.4583 29.0967 23.542C27.8479 23.2997 26.6056 23.1008 25.5 23C22.6402 22.7392 18.8236 22.9581 16.1631 23.1826C14.7908 26.0329 11.8751 28 8.5 28C3.80558 28 0 24.1944 0 19.5C0 14.8056 3.80558 11 8.5 11C12.202 11 15.3495 13.3671 16.5156 16.6699C19.1556 16.7608 22.7703 16.8022 25.5 16.5C26.8029 16.3557 28.2977 16.0888 29.7695 15.7832C32.2731 6.68418 40.6055 0 50.5 0H117.5Z"
                          fill="white"
                        />
                      </svg>
                    </div> */}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Call to Action */}
            <div className="hidden md:flex items-center gap-8">
              {
                token ? <div className="flex items-center gap-4">

                  <button className="text-white w-12.5 h-12.5 rounded-full flex justify-center items-center" style={{
                    borderRadius: "25px",
                    background: "rgba(217, 217, 217, 0.10)"
                  }}><Search /></button>
                  <button className="text-white w-12.5 h-12.5 rounded-full flex justify-center items-center" style={{
                    borderRadius: "25px",
                    background: "rgba(217, 217, 217, 0.10)"
                  }}><Bell /></button>
                  <div className="relative" ref={dropdownRef}>
                    <div
                      className="w-17.5 h-17.5 rounded-full border border-white overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <img src={profileImg} alt="profile image" className="w-full h-full object-cover rounded-full" />
                    </div>

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute right-0 mt-3 w-56 bg-[#0F1118]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-hidden transition-all duration-300 origin-top-right ${isDropdownOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                        }`}
                    >
                      <div className="p-2 flex flex-col gap-1">
                        <Link onClick={() => setIsDropdownOpen(false)} to="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                          <User size={18} />
                          <span className="font-medium text-[15px]">Profile</span>
                        </Link>
                        <Link onClick={() => setIsDropdownOpen(false)} to="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                          <Settings size={18} />
                          <span className="font-medium text-[15px]">Settings</span>
                        </Link>
                        <div className="border-t border-white/10 my-1"></div>
                        <button
                          onClick={() => {
                            dispatch(logout())
                            window.location.reload();
                          }}
                          className="flex items-center w-full gap-3 px-4 py-3 rounded-xl text-[#FF4D4F] hover:text-white hover:bg-[#FF4D4F]/80 transition-all font-medium"
                        >
                          <LogOut size={18} />
                          <span className="text-[15px]">Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div> : <>
                  <Link
                    to="/login"
                    className="text-white/80 hover:text-white transition-colors font-medium text-[16px]"
                  >
                    Sign In
                  </Link>
                  <button
                    className="relative group px-7 py-3 font-bold text-white transition-all duration-500 hover:scale-[1.05] active:scale-[0.97] shadow-[0_0_20px_-5px_rgba(102,249,230,0.3)] hover:shadow-[0_0_30px_-5px_rgba(102,249,230,0.5)] cursor-pointer border-2 border-gray-500"
                    style={{
                      borderRadius: "14px",
                      overflowX: "hidden",
                      background:
                        "linear-gradient(94deg, #66F9E6 7.78%, #305BC9 100%), #66F9E6",
                      backdropFilter: "blur(37px)",
                    }}
                  >
                    <span className="relative z-10">Start Free Trial</span>
                  </button></>
              }
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/10 shadow-lg"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </CommonWrapper>

        {/* Mobile Navigation Overlay */}
        <div
          className={`lg:hidden fixed inset-0 top-0 h-screen bg-[#050505]/98 backdrop-blur-[50px] overflow-auto transition-all duration-500 ease-in-out z-[-1] ${isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
            }`}
        >
          <div className="flex flex-col pt-32 p-8 gap-4 h-full">
            {navLinks.map((link, idx) => {
              const isActive = activeLink === link.name;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl font-bold py-6 px-6 rounded-2xl transition-all duration-150 flex items-center justify-between border ${isActive
                    ? "bg-white text-black border-white shadow-xl"
                    : "text-white/90 hover:bg-white/5 hover:text-[#66F9E6] border-transparent hover:border-white/5"
                    } ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {link.name}
                  {isActive ? (
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-linear-to-r from-[#66F9E6] to-[#305BC9]"></div>
                  )}
                </Link>
              );
            })}
            <div
              className={`mt-auto flex flex-col gap-6 pb-12 transition-all duration-500 delay-300 ${isMobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
                }`}
            >
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center py-5 text-white/90 font-bold text-xl border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                Sign In
              </Link>
              <button
                className="w-full py-5 font-black text-white text-xl shadow-2xl active:scale-[0.98] transition-transform duration-200"
                style={{
                  borderRadius: "14px",
                  border: "3px solid rgba(255, 255, 255, 0.20)",
                  background:
                    "linear-gradient(94deg, #66F9E6 7.78%, #305BC9 100%), #66F9E6",
                  backdropFilter: "blur(37px)",
                }}
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarTwo;
