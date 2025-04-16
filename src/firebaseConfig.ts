// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Твоя конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDKnA_UL4fqMN45JOg1Qec20ivEIBW8gb0",
    authDomain: "diplom666-3b982.firebaseapp.com",
    projectId: "diplom666-3b982",
    storageBucket: "diplom666-3b982.firebasestorage.app",
    messagingSenderId: "939877457048",
    appId: "1:939877457048:web:a796c37ebf48f678d6c4ed",
    measurementId: "G-PKGD2WCLYD",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Получаем экземпляры Auth и Firestore для работы с аутентификацией и базой данных
export const auth = getAuth(app);
export const db = getFirestore(app);
