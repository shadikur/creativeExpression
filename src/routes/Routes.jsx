import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../layout/LandingPage";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Default from "../layout/Default";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Events from "../pages/Events";
import Classes from "../pages/Classes";

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
                path: "/classes",
                element: <Classes></Classes>
            },
            {
                path: "/events",
                element: <Events></Events>
            },
            {
                path: "/contact",
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
        path: "/public",
        element: <Default></Default>,
        children: [


        ]
    }
]);

export default routes;