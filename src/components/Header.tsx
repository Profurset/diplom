import { Link } from "react-router-dom";
import "../styles/Header.css";
import {useState} from "react";

const Header = () => {
        const [isMenuOpen, setMenuOpen] = useState(false);

        const toggleMenu = () => {
                setMenuOpen(!isMenuOpen);
        };

        return (
            <header className="header">
                    <div className="header-container">
                            {/* Логотип */}
                            <div className="logo">
                                    <Link to="/" className="site-title">🧩👻🍄Мир знаний</Link>
                            </div>

                            {/* Навигация по центру */}
                            <nav className="nav">
                                    <ul className="nav-items">
                                            <li><Link to="/exercises" className="nav-link">Тренажёры</Link></li>
                                            <li><Link to="/tests" className="nav-link">Тесты</Link></li>
                                            <li><Link to="/theory" className="nav-link">Теория</Link></li>
                                    </ul>
                            </nav>

                            {/* Фото профиля в правом углу */}
                            <div className="profile-container">
                                    <img src="https://via.placeholder.com/40" // Замени на URL фотографии профиля alt="Профиль"
                                         className="profile-picture"
                                         onClick={toggleMenu}
                                    />
                                    {isMenuOpen && (
                                        <div className="dropdown-menu">
                                                <Link to="/profile" className="dropdown-link">Личный кабинет</Link>
                                                <Link to="/register" className="dropdown-link">Регистрация</Link>
                                                <Link to="/login" className="dropdown-link">Вход</Link>
                                        </div>
                                    )}
                            </div>
                    </div>
            </header>
        );
};

export default Header;