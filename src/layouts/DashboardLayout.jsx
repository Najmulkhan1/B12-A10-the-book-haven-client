import React from 'react'
import { NavLink, Outlet, Link } from 'react-router'
import { FaBook, FaHome, FaPlusSquare, FaUser, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa'
import useAuth from '../hooks/useAuth'

const DashboardLayout = () => {
    const { user, logOut } = useAuth()

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch((error) => console.log(error))
    }

    const sidebarLinks = [
        { to: "/dashboard", label: "Overview", icon: <FaTachometerAlt /> },
        { to: "/dashboard/add-book", label: "Add Book", icon: <FaPlusSquare /> },
        { to: "/dashboard/my-books", label: "My Books", icon: <FaBook /> },
        { to: "/dashboard/profile", label: "My Profile", icon: <FaUser /> },
    ]

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar bg-base-300 flex justify-between px-4 z-10 sticky top-0">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1 px-2 mx-2 text-xl font-bold text-base-content">Dashboard</div>
                        <div className="flex-none gap-2">
                            {/* Profile Dropdown */}
                            {user && (
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="User Profile"
                                                src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                            />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                        <li>
                                            <Link to="/dashboard/profile" className="justify-between">
                                                Profile
                                                <span className="badge">New</span>
                                            </Link>
                                        </li>
                                        <li><Link to="/dashboard">Dashboard Home</Link></li>
                                        <li><Link to="/">Home</Link></li>
                                        <li><button onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Page content here */}
                    <div className="p-4 bg-base-200 min-h-screen">
                        <Outlet></Outlet>
                    </div>
                </div>
                <div className="drawer-side z-20">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu p-4 w-64 min-h-full bg-base-100 text-base-content flex flex-col justify-between">
                        <div>
                            <div className="mb-6 px-4">
                                <Link to="/" className="text-2xl font-bold text-primary">BookHaven</Link>
                            </div>
                            <ul>
                                {sidebarLinks.map((link) => (
                                    <li key={link.to}>
                                        <NavLink
                                            to={link.to}
                                            end={link.to === "/dashboard"}
                                            className={({ isActive }) =>
                                                isActive ? "active font-bold" : ""
                                            }
                                        >
                                            {link.icon}
                                            {link.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="border-t border-base-300 pt-4">
                            <ul>
                                <li>
                                    <Link to="/">
                                        <FaHome />
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="text-error">
                                        <FaSignOutAlt />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout