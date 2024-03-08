import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import HomePage from "./components/frontOffice/HomePage";
import DashboardPage from "./components/backOffice/DashboardPage";
import EventsPage from "./components/backOffice/EventsPage";
import ReservationsPage from "./components/backOffice/ReservationsPage";
import UsersPage from "./components/backOffice/UsersPage";
import CategoriesPage from "./components/backOffice/CategoriesPage";
import MyEventsPage from "./components/backOffice/MyEventsPage";
import BackOfficeLayout from "./layouts/BackOfficeLayout";
import CategoryForm from "./components/backOffice/CategoryForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/",
    element: <BackOfficeLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/events",
        element: <EventsPage />,
      },
      {
        path: "/reservations",
        element: <ReservationsPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/categories/create",
        element: <CategoryForm key="userCreate" />,
      },
      {
        path: "/categories/:id",
        element: <CategoryForm key="userUpdate" />,
      },
      {
        path: "/my-events",
        element: <MyEventsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
