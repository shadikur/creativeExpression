import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../layout/LandingPage";
import Home from "../pages/Home";
import Blogs from "../pages/Blogs";
import Contact from "../pages/Contact";
import Default from "../layout/Default";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";

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
                element: <h1>Classes</h1>
            },
            {
                path: "/blogs",
                element: <Blogs></Blogs>
            },
            {
                path: "/contact",
                element: <Contact></Contact>
            },
        ]
    },
    {
        path: "public/",
        element: <Default></Default>,
        children: [
            {
                path: "signin",
                element: <Signin></Signin>
            },
            {
                path: "signup",
                element: <Signup></Signup>
            }
        ]
    }
]);

export default routes;