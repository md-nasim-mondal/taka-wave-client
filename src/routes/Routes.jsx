import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import CashIn from "../pages/CashIn";
import CashOut from "../pages/CashOut";
import SendMoney from "../pages/SendMoney";
import Transactions from "../pages/Transactions";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../pages/ManageUsers";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <PrivateRoute> <Home /> </PrivateRoute>
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/cash-in',
                element: <PrivateRoute> <CashIn /> </PrivateRoute>
            },
            {
                path: '/cash-out',
                element: <PrivateRoute> <CashOut /> </PrivateRoute>
            },
            {
                path: '/send-money',
                element: <PrivateRoute> <SendMoney /> </PrivateRoute>
            },
            {
                path: '/transactions',
                element: <PrivateRoute> <Transactions /> </PrivateRoute>
            },
            {
                path: '/profile',
                element: <PrivateRoute> <Profile /> </PrivateRoute>
            },
            {
                path: '/manage-users',
                element: <AdminRoute><PrivateRoute> <ManageUsers /> </PrivateRoute></AdminRoute>
            },
        ]
    },
]);