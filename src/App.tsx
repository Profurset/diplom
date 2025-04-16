import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Exercises from "./pages/Exercises";
import Tests from "./pages/Tests";
import Theory from "./pages/Theory";
import "../src/App.css";  // Путь к стилям App.css в папке src



function App() {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/exercises" element={<Exercises />} />
                    <Route path="/tests" element={<Tests />} />
                    <Route path="/theory" element={<Theory />} />
                </Routes>
            </main>
            <Footer />

        </Router>
    );
}

export default App;
