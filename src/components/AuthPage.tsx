import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    AuthError,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

import "../styles/Auth.css";

const AuthPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoginMode, setIsLoginMode] = useState(true);

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            const error = err as AuthError;
            let message = "Произошла ошибка";

            switch (error.code) {
                case "auth/invalid-credential":
                case "auth/user-not-found":
                case "auth/wrong-password":
                    message = "Неверная почта или пароль.";
                    break;
                case "auth/user-disabled":
                    message = "Этот пользователь заблокирован.";
                    break;
                default:
                    console.error("Ошибка входа:", error);
            }

            setError(message);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password.length < 6) {
            setError("Пароль должен содержать минимум 6 символов.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await signOut(auth);
            setIsLoginMode(true);
            navigate("/auth");
        } catch (err) {
            const error = err as AuthError;
            let message = "Произошла ошибка";

            switch (error.code) {
                case "auth/email-already-in-use":
                    message = "Почта уже используется.";
                    break;
                case "auth/invalid-email":
                    message = "Некорректный адрес электронной почты.";
                    break;
                case "auth/weak-password":
                    message = "Пароль слишком простой.";
                    break;
                default:
                    console.error("Ошибка регистрации:", error);
            }

            setError(message);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={isLoginMode ? handleLogin : handleRegister} className="auth-form">
                <h2>{isLoginMode ? "Вход" : "Регистрация"}</h2>

                {error && <p className="error">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="btn-submit">
                    {isLoginMode ? "Войти" : "Зарегистрироваться"}
                </button>

                <div className="link-toggle">
                    {isLoginMode ? (
                        <>
                            Нет аккаунта?{" "}
                            <span onClick={() => setIsLoginMode(false)} className="link">
                                Зарегистрируйтесь
                            </span>
                        </>
                    ) : (
                        <>
                            Уже есть аккаунт?{" "}
                            <span onClick={() => setIsLoginMode(true)} className="link">
                                Войдите
                            </span>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AuthPage;
