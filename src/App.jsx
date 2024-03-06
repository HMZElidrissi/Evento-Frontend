import { BrowserRouter, Routes, Route } from "react-router-dom";
import SomePage from "./components/SomePage";
import AnotherPage from "./components/AnotherPage";
import LoginPage from "./components/auth/LoginPage";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SomePage />} />
        <Route path="/another" element={<AnotherPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Define more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
