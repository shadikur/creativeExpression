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
import AddUsers from "../pages/Dashboard/AddUsers";
import ViewCourses from "../pages/Dashboard/ViewCourses";
import ViewCourseCategory from "../pages/Dashboard/ViewCourseCategory";
import AddCourseCategory from "../pages/Dashboard/AddCourseCategory";
import ViewAllUsers from "../pages/Dashboard/ViewAllUsers";
import ViewProfile from "../pages/Dashboard/ViewProfile";
import Settings from "../pages/Dashboard/Settings";
import ViewEvents from "../pages/Dashboard/ViewEvents";
import AddEvents from "../pages/Dashboard/AddEvents";
import ViewPayments from "../pages/Dashboard/ViewPayments";

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
                path: "addclasses",
                element: <AddCourse></AddCourse>,
            },
            {
                path: "viewclasses",
                element: <ViewCourses></ViewCourses>
            },
            {
                path: "addusers",
                element: <AddUsers></AddUsers>
            },
            {
                path: "viewusers",
                element: <ViewAllUsers></ViewAllUsers>
            },
            {
                path: "addcoursecategory",
                element: <AddCourseCategory></AddCourseCategory>
            },
            {
                path: "viewcoursecategory",
                element: <ViewCourseCategory></ViewCourseCategory>
            },
            {
                path: "viewprofile",
                element: <ViewProfile></ViewProfile>
            },
            {
                path: "settings",
                element: <Settings></Settings>
            },
            {
                path: "viewevents",
                element: <ViewEvents></ViewEvents>
            },
            {
                path: "addevents",
                element: <AddEvents></AddEvents>
            },
            {
                path: "viewpayments",
                element: <ViewPayments></ViewPayments>
            }

        ]
    }
]);

export default routes;