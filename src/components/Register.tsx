import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "../styles/Auth.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        try {
            // Регистрация пользователя в Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            // Создание документа пользователя в Firestore
            await setDoc(doc(db, "users", userId), {
                name: " ",
                photo: "/src/assets/КОТИК.jpg", // Дефолтный аватар
                progress: {
                    tests: {},     // Результаты тестов по темам
                    exercises: {}  // Прогресс тренажёров
                }
            });

            setSuccessMessage("Регистрация успешно завершена! Теперь вы можете войти.");
            console.log("Пользователь успешно зарегистрирован и создан документ в Firestore");
        } catch (error: unknown) {
            let errorMessage = "Произошла ошибка при регистрации.";

            if (typeof error === "object" && error !== null && "code" in error) {
                const firebaseError = error as { code: string };

                switch (firebaseError.code) {
                    case "auth/email-already-in-use":
                        errorMessage = "Пользователь с такой почтой уже существует.";
                        break;
                    case "auth/invalid-email":
                        errorMessage = "Некорректный адрес электронной почты.";
                        break;
                    case "auth/weak-password":
                        errorMessage = "Пароль должен содержать минимум 6 символов.";
                        break;
                    case "auth/operation-not-allowed":
                        errorMessage = "Регистрация через email и пароль отключена.";
                        break;
                    default:
                        console.error("Ошибка регистрации:", firebaseError.code);
                        errorMessage = "Произошла ошибка. Попробуйте ещё раз.";
                }
            }

            setError(errorMessage);
        }
    };

    return (
        <section className="auth-section">
            <div className="auth-container">
                <div className="auth-form">
                    <h2>Регистрация</h2>
                    <form onSubmit={handleRegister}>
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
                        <button type="submit">Зарегистрироваться</button>
                    </form>
                    {error && <p className="error">{error}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}
                    <p>
                        Уже есть аккаунт?{" "}
                        <a href="/login" className="link">
                            Войти
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Register;