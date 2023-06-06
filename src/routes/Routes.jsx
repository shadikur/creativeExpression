import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <h1>404 Not Found</h1>,
        children: [
            {
                path: "/",
                element: <App></App>
            }
        ]

    }
])

export default routes;