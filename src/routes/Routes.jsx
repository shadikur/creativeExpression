import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../layout/LandingPage";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Events from "../pages/Events";
import Classes from "../pages/Classes";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../layout/DashboardLayout";
import AddCourse from "../pages/Dashboard/AddCourse";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage></LandingPage>,
        errorElement: <h1>404 Not Found</h1>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "classes",
                element: <Classes></Classes>
            },
            {
                path: "events",
                element: <Events></Events>
            },
            {
                path: "contact",
                element: <Contact></Contact>
            },
            {
                path: "signin",
                element: <Signin></Signin>
            },
            {
                path: "signup",
                element: <Signup></Signup>
            }


        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: "",
                element: <Dashboard></Dashboard>,
            },
            {
                path: "addcourse",
                element: <AddCourse></AddCourse>,
            },
            {
                path: "viewcourse",
                element: <AddCourse></AddCourse>,
            },
            {
                path: "addusers",
                element: <AddCourse></AddCourse>,
            },
            {
                path: "viewusers",
                element: <AddCourse></AddCourse>,
            },
            {
                path: "addcoursecategory",
                element: <AddCourse></AddCourse>,
            },
            {
                path: "viewcoursecategory",
                element: <AddCourse></AddCourse>,
            },


        ]
    }
]);

export default routes;