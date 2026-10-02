import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Тип награды
export interface Reward {
    id: string;
    title: string;
    icon: string;
    earnedAt: string; // ISO дата
}

/**
 * Сохраняет результат теста в Firestore (добавляет в массив по теме)
 */
export const saveTestResult = async (userId: string, score: number, topic: string) => {
    const userDocRef = doc(db, "users", userId);
    try {
        const snapshot = await getDoc(userDocRef);
        const data = snapshot.exists() ? snapshot.data() : {};

        const existingScores = data?.progress?.tests?.[topic] || [];
        const updatedScores = [...existingScores, score];

        await updateDoc(userDocRef, {
            [`progress.tests.${topic}`]: updatedScores,
        });

        console.log(`Тест сохранён по теме '${topic}': ${score}`);
    } catch (error) {
        console.error("Ошибка сохранения результата теста:", error);
    }
};

/**
 * Сохраняет прогресс тренажёра в Firestore (добавляет в массив по теме)
 */
export const updateExerciseProgress = async (userId: string, topic: string, progress: number) => {
    const userDocRef = doc(db, "users", userId);
    try {
        const snapshot = await getDoc(userDocRef);
        const data = snapshot.exists() ? snapshot.data() : {};

        const existingScores = data?.progress?.exercises?.[topic] || [];
        const updatedScores = [...existingScores, progress];

        await updateDoc(userDocRef, {
            [`progress.exercises.${topic}`]: updatedScores,
        });

        console.log(`Прогресс по тренажёру '${topic}' сохранён: ${progress}`);
    } catch (error) {
        console.error("Ошибка сохранения прогресса тренажёра:", error);
    }
};

/**
 * Проверяет, есть ли у пользователя конкретная награда
 */
export const hasReward = async (userId: string, rewardId: string): Promise<boolean> => {
    const userDocRef = doc(db, "users", userId);
    try {
        const snapshot = await getDoc(userDocRef);
        const userData = snapshot.data();

        return (
            Array.isArray(userData?.rewards) &&
            userData.rewards.some((r: Reward) => r.id === rewardId)
        );
    } catch (error) {
        console.error("Ошибка при проверке награды:", error);
        return false;
    }
};

/**
 * Добавляет новую награду пользователю в Firestore
 */
export const addRewardToUser = async (
    userId: string,
    reward: Omit<Reward, "earnedAt"> & { earnedAt?: string }
) => {
    const userDocRef = doc(db, "users", userId);

    try {
        const fullReward = {
            ...reward,
            earnedAt: reward.earnedAt || new Date().toISOString(),
        };

        await updateDoc(userDocRef, {
            rewards: arrayUnion(fullReward),
        });

        console.log("Награда добавлена:", fullReward.title);
    } catch (error) {
        console.error("Ошибка при добавлении награды:", error);
    }
};