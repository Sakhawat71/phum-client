import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.route";
import { facultyPaths } from "./faculty.route";
import { studentPaths } from "./student.route";
import ErrorPage from "../pages/ErrorPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement : <ErrorPage />,
    },
    {
        path: '/admin',
        element: <App />,
        errorElement :<ErrorPage /> ,
        children: routeGenerator(adminPaths)
    },
    {
        path: '/faculty',
        element: <App />,
        errorElement :<ErrorPage /> ,
        children: routeGenerator(facultyPaths)
    },
    {
        path: '/student',
        element: <App />,
        errorElement :<ErrorPage /> ,
        children: routeGenerator(studentPaths)
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