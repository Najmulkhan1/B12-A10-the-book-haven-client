import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/logo3.svg";
import useAuth from "../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import Switch from "./Switch";
import { BsPersonFillGear } from "react-icons/bs";
import { Settings, LogOut } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => { })
      .catch((error) => {
        console.log(error);
      });
  };

  // Public links (Visible to everyone or just guests?)
  // Requirement: Logged-out: minimum 3 routes.
  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/all-books", label: "All Books" },
    { to: "/contact", label: "Contact" },
    { to: "/about", label: "About" },
    
  ];

  // Protected links (Visible only to logged-in users)
  // Requirement: Logged-in: minimum 5 routes.
  // We combine public + protected for users, or just use a specific set.
  // Let's combine: Home, All Books, Add Book, My Books, About (Optional)
  const protectedLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/my-profile", label: "My Profile" },
  ];

  // Final list based on auth
  const navItems = user
    ? [...publicLinks.filter(l => l.to !== "/about"), ...protectedLinks, { to: "/about", label: "About" }] // 3 + 2 = 5 routes.
    : publicLinks; // 3 routes.

  return (
    // Full-width sticky container. Removed max-w-7xl constraint from wrapper.
    // Added bg-base-100/80 and backdrop-blur-md for the background effect.
    <div className="sticky top-0 z-50 w-full bg-base-100/90 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="overflow-visible">
          <div className="flex justify-between h-16 items-center">
            {/* Left: Logo */}
            <Link to="/">
              <div className="h-20 w-20 rounded-md flex items-center justify-center">
                <img src={logo} alt="Book Haven" />
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `relative inline-flex items-center px-1 ${isActive
                      ? "text-green-600 font-medium"
                      : " font-medium text-base-content hover:text-green-600"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{item.label}</span>
                      {isActive && (
                        <svg
                          className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-0 pointer-events-none transition-opacity duration-300 ease-out"
                          width="64"
                          height="12"
                          viewBox="0 0 64 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M2 6 Q32 14 62 6"
                            stroke="#fbb03b"
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right: Auth & Toggle */}
            <div className="flex justify-center items-center gap-2">
              <Switch />
              {user ? (
                <>
                  <div className="dropdown dropdown-end z-50">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div
                        id="clickable"
                        className="w-9 border-2 border-base-300 rounded-full"
                      >
                        <img
                          alt="User Avatar"
                          referrerPolicy="no-referrer"
                          src={
                            user.photoURL ||
                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          }
                        />
                        <Tooltip
                          anchorSelect="#clickable"
                          clickable
                          className="hidden md:block z-50"
                        >
                          <h3 className="text-lg text-amber-600 font-semibold">{user?.displayName}</h3>
                          <Link to={'/dashboard'} className="flex mt-4 text-amber-600 items-center gap-3 p-2 rounded-sm border border-amber-600"> Dashboard</Link>
                          <Link to={'/dashboard/profile'} className="flex mt-2 text-amber-600 items-center gap-3 p-2 rounded-sm border border-amber-600"><BsPersonFillGear /> My Profile</Link>
                          <button
                            onClick={handleLogout}
                            className="bg-amber-600 w-full py-1 px-2 rounded-sm mt-3 cursor-pointer text-white flex justify-center items-center gap-2"
                          >
                            <LogOut size={16} /> LogOut
                          </button>
                        </Tooltip>
                      </div>
                    </div>

                    {/* Mobile/Tablet Dropdown Fallback */}
                    <ul
                      tabIndex="-1"
                      className="menu md:hidden menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
                    >
                      <div className=" pb-3 border-b border-base-200">
                        <li className="text-sm font-bold text-base-content">
                          {user.displayName}
                        </li>
                        <li className="text-xs text-base-content/70">{user.email}</li>
                        <li><Link to={'/dashboard'} className="flex mt-2 text-amber-600 items-center gap-3 p-2 rounded-sm border border-amber-600"> Dashboard</Link></li>
                        <li><Link to={'/dashboard/profile'} className="flex mt-2 text-amber-600 items-center gap-3 p-2 rounded-sm border border-amber-600"><BsPersonFillGear /> My Profile</Link></li>

                        <li className="pt-3">
                          <button
                            type="button"
                            onClickCapture={(e) => {
                              e.stopPropagation();
                              handleLogout();
                            }}
                            className="btn bg-amber-600 py-1 px-2 rounded-sm cursor-pointer w-full text-white"
                          >
                            LogOut
                          </button>
                        </li>
                      </div>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="inline-flex">
                    <Link
                      to={"/login"}
                      className="btn bg-amber-700 border-none text-white shadow none hover:bg-amber-800"
                    >
                      Login
                    </Link>
                  </div>
                  <div className="inline-flex">
                    <Link
                      to={"/register"}
                      className="btn bg-transparent border border-amber-700 hover:bg-amber-800 hover:text-white shadow none text-base-content"
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}

              {/* Mobile Menu Button */}
              <div className="md:hidden inline-flex items-center justify-center gap-3">
                <button
                  onClick={() => setOpen(!open)}
                  className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-base-content hover:bg-base-200 focus:outline-none"
                  aria-label="Toggle menu"
                  aria-expanded={open}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {open ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu Body */}
      <div
        className={`absolute right-0 left-0 w-full md:hidden ${open ? "block" : "hidden"
          } bg-base-100 border-t border-base-200 shadow-lg`}
      >
        <div className="px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-amber-600 font-medium bg-amber-100/50 px-3 py-2 rounded-md"
                  : "block text-base-content hover:text-amber-700 hover:bg-base-200 px-3 py-2 rounded-md"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
