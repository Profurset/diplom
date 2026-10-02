import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { auth } from "../firebaseConfig";
import logo from '../assets/logo.png';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Header = () => {
        const [isMenuOpen, setMenuOpen] = useState(false);
        const [userPhoto, setUserPhoto] = useState<string | null>(null);
        const [userName, setUserName] = useState<string | null>(null);
        const [userSurname, setUserSurname] = useState<string | null>(null); // Новое состояние для фамилии
        const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
        const [isLoading, setIsLoading] = useState(true);
        const menuRef = useRef<HTMLDivElement>(null);

        // Подписка на изменение состояния авторизации и данных пользователя
        useEffect(() => {
                setIsLoading(true);

                const unsubscribeAuth = auth.onAuthStateChanged((user) => {
                        if (user) {
                                const userDocRef = doc(db, "users", user.uid);

                                // Реал-тайм подписка на данные пользователя
                                const unsubscribeUser = onSnapshot(userDocRef, (docSnapshot) => {
                                        if (docSnapshot.exists()) {
                                                const data = docSnapshot.data();
                                                setUserPhoto(data.photo || "/src/assets/default-avatar.jpg");
                                                setUserName(data.name || "Пользователь");
                                                setUserSurname(data.surname || ""); // Берём фамилию
                                        }
                                        setIsLoading(false);
                                });

                                setIsAuthenticated(true);
                                return unsubscribeUser; // Возвращаем функцию отписки
                        } else {
                                setUserPhoto(null);
                                setUserName(null);
                                setUserSurname(null);
                                setIsAuthenticated(false);
                                setIsLoading(false);
                        }
                });

                return () => {
                        unsubscribeAuth(); // Отписываемся при размонтировании
                };
        }, []);

        // Закрытие меню при клике вне его
        useEffect(() => {
                const handleClickOutside = (event: MouseEvent) => {
                        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                                setMenuOpen(false);
                        }
                };

                document.addEventListener("mousedown", handleClickOutside);
                return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        return (
            <header className="header">
                    <div className="header-container">
                            {/* Логотип */}
                            <div className="logo">
                                    <Link to="/" className="site-title">
                                            <img src={logo} alt="Логотип" width={50} height={50} />
                                            Мир Знаний
                                    </Link>
                            </div>

                            {/* Навигация по центру */}
                            <nav className="nav">
                                    <ul className="nav-items">
                                            <li><Link to="/exercises" className="nav-link">Тренажёры</Link></li>
                                            <li><Link to="/tests" className="nav-link">Тесты</Link></li>
                                            <li><Link to="/theory" className="nav-link">Теория</Link></li>
                                    </ul>
                            </nav>

                            {/* Блок профиля */}
                            {isLoading ? (
                                <div className="loading-spinner"></div>
                            ) : (
                                <div className="profile-section" ref={menuRef}>
                                        {isAuthenticated && userName && (
                                            <span className="user-name">{`${userName} ${userSurname}`}</span>
                                        )}

                                        <img
                                            src={userPhoto || "/src/assets/КОТИК.jpg"}
                                            alt="Аватар"
                                            className="profile-picture"
                                            onClick={() => setMenuOpen(!isMenuOpen)}
                                        />

                                        {isMenuOpen && (
                                            <div className="dropdown-menu">
                                                    {isAuthenticated ? (
                                                        <>
                                                                <Link
                                                                    to="/profile"
                                                                    className="dropdown-link"
                                                                    onClick={() => setMenuOpen(false)}
                                                                >
                                                                        Профиль
                                                                </Link>
                                                                <Link
                                                                    to="/login"
                                                                    className="dropdown-link"
                                                                    onClick={() => {
                                                                            auth.signOut();
                                                                            setMenuOpen(false);
                                                                    }}
                                                                >
                                                                        Выход
                                                                </Link>
                                                        </>
                                                    ) : (
                                                        <>
                                                                <Link
                                                                    to="/login"
                                                                    className="dropdown-link"
                                                                    onClick={() => setMenuOpen(false)}
                                                                >
                                                                        Вход
                                                                </Link>
                                                                <Link
                                                                    to="/register"
                                                                    className="dropdown-link"
                                                                    onClick={() => setMenuOpen(false)}
                                                                >
                                                                        Регистрация
                                                                </Link>
                                                        </>
                                                    )}
                                            </div>
                                        )}
                                </div>
                            )}
                    </div>
            </header>
        );
};

export default Header;