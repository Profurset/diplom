// src/firebaseFirestore.ts
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Инициализируем Firestore
const db = getFirestore();

// Функция для сохранения результата теста
export const saveTestResult = async (userId: string, score: number) => {
    try {
        const docRef = await addDoc(collection(db, "testResults"), {
            userId,
            score,
            timestamp: new Date(),
        });
        console.log("Документ успешно добавлен в Firestore:", docRef.id);
    } catch (e) {
        console.error("Ошибка при добавлении документа:", e);
    }
};
