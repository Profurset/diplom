import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../styles/Auth.css";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully");
            // Здесь можно перенаправить на главную страницу или на страницу профиля
        } catch (error: unknown) {
            // Приводим ошибку к типу Error
            if (error instanceof Error) {
                setError(error.message); // Используем error.message
            } else {
                setError("An unknown error occurred");
            }
            console.error("Error logging in user:", error);
        }
    };

    return (
        <div>
            <h2>Вход</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Войти</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
