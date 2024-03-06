import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SomePage from "./components/SomePage";
import AnotherPage from "./components/AnotherPage";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    {/* Navigation bar, etc. */}
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<SomePage />} />
                        <Route path="/another" element={<AnotherPage />} />
                        {/* Define more routes as needed */}
                    </Routes>
                </main>
                <footer>{/* Footer content */}</footer>
            </div>
        </Router>
    );
}

export default App;
