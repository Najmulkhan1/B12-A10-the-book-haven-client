import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/logo3.svg";
import useAuth from "../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import Switch from "./Switch";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { user, logOut } = useAuth();
  //   const [isMobile, setIsMobile] = useState(false);
  //   const [showTooltip, setShowTooltip] = useState(false);

  //   useEffect(() => {
  //     const checkMobile = () => setIsMobile(window.innerWidth <= 768);
  //     checkMobile();
  //     window.addEventListener("resize", checkMobile);
  //     return () => window.removeEventListener("resize", checkMobile);
  //   }, []);

  //   const handleTooltipClick = () => {
  //     if (isMobile) {
  //       setShowTooltip(!showTooltip);
  //     }
  //   };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/all-books", label: "All Books" },
    { to: "/add-book", label: "Add Book" },
    { to: "/my-books", label: "My Books" },
  ];

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-11/12 mx-auto mt-2">
      <header className=" rounded-full bg-transparent shadow-sm sticky top-0 z-50 overflow-visible">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left: Logo */}
            <Link to="/">
              <div className="h-20 w-20 rounded-md flex items-center justify-center">
                <img src={logo} alt="" />
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  // use NavLink's className callback to style text; we render SVG inside children callback
                  className={({ isActive }) =>
                    `relative inline-flex items-center px-1 ${
                      isActive
                        ? "text-green-600 font-medium"
                        : " font-medium hover:text-green-600"
                    }`
                  }
                >
                  {/* children as function to get isActive so we can show svg */}
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{item.label}</span>

                      {/* Inline SVG arc underline: only rendered when active */}
                      {isActive && (
                        <svg
                          className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-0 pointer-events-none transition-opacity duration-300 ease-out"
                          width="64"
                          height="12"
                          viewBox="0 0 64 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          style={{ opacity: 1, transform: "translateY(0)" }}
                        >
                          {/* gentle arc path (adjust d, strokeWidth to taste) */}
                          <path
                            d="M2 6 Q32 14 62 6"
                            stroke="#fbb03b" /* emerald-600 */
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

            <div className="flex justify-center items-center gap-2">

                <Switch></Switch>
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
                        className="w-9 border-2 border-gray-300 rounded-full"
                      >
                        <img
                          alt="Tailwind CSS Navbar component"
                          referrerPolicy="no-referrer"
                          src={
                            user.photoURL ||
                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          }
                        />
                        <Tooltip
                          anchorSelect="#clickable"
                          clickable
                          className="hidden md:block"
                        >
                          <h3>{user?.displayName}</h3>
                          <button
                            onClick={handleLogout}
                            className="bg-amber-600  py-1 px-2 rounded-sm mt-3 cursor-pointer"
                          >
                            LogOut
                          </button>
                        </Tooltip>
                      </div>

                      {/* <div className=" pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
              </div> */}
                    </div>

                    <ul
                      tabIndex="-1"
                      className="menu md:hidden  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
                    >
                      <div className=" pb-3 border-b border-b-gray-200">
                        <li className="text-sm font-bold">
                          {user.displayName}
                        </li>
                        <li className="text-xs">{user.email}</li>

                        <li className="pt-3">
                          <button
                            type="button"
                            // Use onClickCapture to ensure it fires before menu closes
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
                      className="btn bg-transparent border border-amber-700  hover:bg-amber-800 hover:text-white shadow none"
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
                  className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
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
        </div>

        {/* Mobile Menu */}

        <div
          className={`absolute right-0 w-1/2 rounded sm:hidden ${
            open ? "block" : "hidden"
          } bg-green-50 border-t border-gray-200`}
        >
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "block text-green-600 font-medium bg-green-100 px-3 py-2 rounded-md"
                    : "block text-gray-700 hover:text-green-600 hover:bg-green-50 px-3 py-2 rounded-md"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
