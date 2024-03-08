import {createBrowserRouter} from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
/*
import HomePage from "./components/frontOffice/HomePage";
*/
import DashboardPage from "./components/backOffice/DashboardPage";
import EventsPage from "./components/backOffice/EventsPage";
import ReservationsPage from "./components/backOffice/ReservationsPage";
import UsersPage from "./components/backOffice/UsersPage";
import CategoriesPage from "./components/backOffice/CategoriesPage";
import MyEventsPage from "./components/backOffice/MyEventsPage";
import BackOfficeLayout from "./layouts/BackOfficeLayout";
import CategoryForm from "./components/backOffice/CategoryForm";
import EventForm from "./components/backOffice/EventForm";
import ForbiddenPage from "./components/errors/403.jsx";
import NotFoundPage from "./components/errors/404.jsx";
import InternalServerErrorPage from "./components/errors/500.jsx";
import FrontOfficeLayout from "./layouts/FrontOfficeLayout.jsx";

const router = createBrowserRouter([

    {
        path: "/",
        element: <FrontOfficeLayout/>,
    },
    {
        path: "/",
        element: <BackOfficeLayout/>,
        children: [
            {
                path: "/dashboard",
                element: <DashboardPage/>,
            },
            {
                path: "/events",
                element: <EventsPage/>,
            },
            {
                path: "/reservations",
                element: <ReservationsPage/>,
            },
            {
                path: "/users",
                element: <UsersPage/>,
            },
            {
                path: "/categories",
                element: <CategoriesPage/>,
            },
            {
                path: "/categories/create",
                element: <CategoryForm key="userCreate"/>,
            },
            {
                path: "/categories/:id",
                element: <CategoryForm key="userUpdate"/>,
            },
            {
                path: "/my-events",
                element: <MyEventsPage/>,
            },
            {
                path: "/my-events/create",
                element: <EventForm key="eventCreate"/>,
            },
            {
                path: "/my-events/:id",
                element: <EventForm key="eventUpdate"/>,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/register",
        element: <RegisterPage/>,
    },
    {
        path: "/500",
        element: <InternalServerErrorPage/>,
    },
    {
        path: "/403",
        element: <ForbiddenPage/>,
    },
    {
        path: "*",
        element: <NotFoundPage/>,
    }
]);

export default router;
