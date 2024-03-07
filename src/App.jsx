import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import ForgetPasswordPage from "./components/auth/ForgetPasswordPage";
import DashboardPage from "./components/backOffice/DashboardPage";
import HomePage from "./components/frontOffice/HomePage";
import NotFoundPage from "./components/errors/404";
import InternalServerErrorPage from "./components/errors/500";
import ForbiddenPage from "./components/errors/403";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/500" element={<InternalServerErrorPage />} />
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
