import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../layout/LandingPage";
import Home from "../pages/Home";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage></LandingPage>,
        errorElement: <h1>404 Not Found</h1>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            }
        ]

    }
])

export default routes;