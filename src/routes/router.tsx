import { createBrowserRouter } from "react-router";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminRoutes } from "./admin.route";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'contact',
                element: <Contact />
            }
        ]
    },
    {
        path: '/admin',
        element: <App />,
        children: adminRoutes
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
]);


export default router;