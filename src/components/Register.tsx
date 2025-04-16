import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../styles/Auth.css";
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("User registered successfully");
            // Здесь можно перенаправить на страницу входа или главную страницу
        } catch (error: unknown) {
            // Приводим ошибку к типу Error
            if (error instanceof Error) {
                setError(error.message); // Используем error.message
            } else {
                setError("An unknown error occurred");
            }
            console.error("Error registering user:", error);
        }
    };

    return (
        <div>
            <h2>Регистрация</h2>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Зарегистрироваться</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Register;
