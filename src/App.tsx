import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

// Отдельные страницы авторизации
import Login from "./components/Login";
import Register from "./components/Register";

// Защищённые страницы
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Theory from "./pages/Theory";
import AdditionNoCarry from "./pages/theory/AdditionNoCarry";
import AdditionWithCarry from "./pages/theory/AdditionWithCarry";
import MultiplicationTable from "./pages/theory/MultiplicationTable";
import Equations from "./pages/theory/Equations";
import Exercises from "./pages/Exercises";
import Tests from "./pages/Tests";

// Стили
import "./styles/App.css";
import AboutUs from "./pages/About-us.tsx";
import Contact from "./pages/Contact.tsx";
import FAQ from "./pages/FAQ.tsx";
import Learning from "./pages/Learning.tsx";

function App() {
    return (
        <Router>
            <Header />
            <main className="main-content">
                <Routes>
                    {/* Общедоступные страницы */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/learning" element={<Learning />} />

                    {/* Страницы входа и регистрации */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Защищённые маршруты */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/profile/edit" element={<ProfileEdit />} />
                        <Route path="/theory" element={<Theory />} />
                        <Route path="/theory/addition-no-carry" element={<AdditionNoCarry />} />
                        <Route path="/theory/addition-with-carry" element={<AdditionWithCarry />} />
                        <Route path="/theory/multiplication-table" element={<MultiplicationTable />} />
                        <Route path="/theory/equations" element={<Equations />} />
                        <Route path="/exercises" element={<Exercises />} />
                        <Route path="/tests" element={<Tests />} />
                    </Route>

                    {/* Редирект для несуществующих маршрутов */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
