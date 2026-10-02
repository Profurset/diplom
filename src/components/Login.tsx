import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Пользователь успешно вошел");
            navigate("/");
        } catch (error: unknown) {
            // Проверяем, является ли ошибка объектом Firebase AuthError
            if (typeof error === "object" && error !== null && "code" in error) {
                const firebaseError = error as { code: string; message: string };

                switch (firebaseError.code) {
                    case "auth/invalid-credential":
                        setError("Неверный логин или пароль.");
                        break;
                    case "auth/user-disabled":
                        setError("Этот пользователь был заблокирован.");
                        break;
                    case "auth/user-not-found":
                        setError("Пользователь с таким email не найден.");
                        break;
                    case "auth/wrong-password":
                        setError("Неверный пароль.");
                        break;
                    default:
                        setError("Произошла ошибка при входе.");
                }

                console.error("Ошибка входа:", firebaseError.code, firebaseError.message);
            } else {
                // Неожидаемая ошибка
                const errorMessage =
                    error instanceof Error ? error.message : "Неизвестная ошибка";
                setError(errorMessage);
                console.error("Неизвестная ошибка:", errorMessage);
            }
        }
    };

    return (
        <section className="auth-section">
            <div className="auth-container">
                <div className="auth-form">
                    <h2>Вход</h2>
                    <form onSubmit={handleLogin}>
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
                        <button type="submit">Войти</button>
                    </form>
                    {error && <p className="error">{error}</p>}
                    <p>
                        Нет аккаунта?{" "}
                        <a href="/register" className="link">
                            Зарегистрироваться
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;