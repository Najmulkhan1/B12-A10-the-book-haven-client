import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home";
import AllBooks from "../pages/AllBooks";
import AddBook from "../pages/AddBook";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import BookDetails from "../components/BookDetails";
import PrivateRoute from "./PrivateRoute";
import MyBooks from "../pages/MyBooks";
import Error from "../pages/Error";

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
                path: 'add-book',
                element: <PrivateRoute>
                    <AddBook></AddBook>
                </PrivateRoute>
            },
            {
                path: "my-books",
                element: <PrivateRoute>
                    <MyBooks></MyBooks>
                </PrivateRoute>
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
        path: '*',
        Component: Error
    }
        ]
    },
    
])

export default router