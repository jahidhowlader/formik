import {
    createBrowserRouter,
} from "react-router-dom";
import Signup from "../page/authentication/signup/Signup";
import BeautifulDnd from "../components/BeautifulDnd";
import MainLayout from "../layout/MainLayout";
import Login from "../page/authentication/login/Login";
import PrivateRoute from "./PrivateRoute";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <PrivateRoute><BeautifulDnd /></PrivateRoute>
            },
            {
                path: "signup",
                element: <Signup />
            },
            {
                path: "login",
                element: <Login />
            }
        ]
    },
]);


export default Routes;