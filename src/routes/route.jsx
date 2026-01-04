import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home";
import AllBooks from "../pages/AllBooks";
import About from "../pages/About";
import AddBook from "../pages/AddBook";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import BookDetails from "../components/BookDetails";
import PrivateRoute from "./PrivateRoute";
import MyBooks from "../pages/MyBooks";
import Error from "../pages/Error";
import MyProfile from "../pages/dashboard/MyProfile";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Contact from "../pages/Contarct";


const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayouts,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'all-books',
                Component: AllBooks
            },
            {
                path: 'about',
                Component: About
            },
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            },
            {
                path: '/books-details/:id',
                Component: BookDetails
            },
            {
                path: 'contact',
                Component: Contact
            },
            {
                path: '*',
                Component: Error
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>,
        children: [
            {
                index: true,
                Component: Dashboard
            },
            {
                path: 'profile',
                Component: MyProfile
            },
            {
                path: 'add-book',
                Component: AddBook
            },
            {
                path: "my-books",
                Component: MyBooks
            }
        ]
    }

])

export default router