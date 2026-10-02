import { useEffect, useState } from "react";
import "../styles/Profile.css";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface UserData {
    name: string;
    surname: string;
    birthdate: string;
    city: string;
    school: string;
    phone: string;
    photo: string;
    progress: {
        tests: Record<string, number[]>;
        exercises: Record<string, number[]>;
    };
}

const TOPIC_NAMES_RU: Record<string, string> = {
    additionWithoutCarry: "Сложение без перехода",
    additionWithCarry: "Сложение с переходом",
    multiplicationTable: "Таблица умножения",
    equations: "Уравнения x + a = b",

    "addition-no-carry": "Сложение без перехода",
    "addition-with-carry": "Сложение с переходом",
    "multiplication-table": "Таблица умножения",
    equate: "Уравнения x + a = b",
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const MAX_TEST_QUESTIONS = 10;

const ProgressPieChart = ({
                              data,
                              colors,
                              lastResultText,
                          }: {
    data: { name: string; value: number }[];
    colors: string[];
    lastResultText: string;
}) => (
    <>
        <ResponsiveContainer width="100%" height={180}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    isAnimationActive={true}
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}${data[0].name === "Правильно" ? "" : "%"}`} />
            </PieChart>
        </ResponsiveContainer>

        <div className="custom-legend">
            {data.map(({ name, value }, idx) => (
                <div key={name} className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: colors[idx] }}></span>
                    <span>{name}: {value}{data[0].name === "Правильно" ? "" : "%"}</span>
                </div>
            ))}
        </div>

        <p className="last-result">{lastResultText}</p>
    </>
);

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = auth.currentUser?.uid;
                if (!userId) return;

                const userDocRef = doc(db, "users", userId);
                const snapshot = await getDoc(userDocRef);

                if (snapshot.exists()) {
                    const userData = snapshot.data() as Partial<UserData>;
                    setUser({
                        name: userData.name || "",
                        surname: userData.surname || "",
                        birthdate: userData.birthdate || "",
                        city: userData.city || "",
                        school: userData.school || "",
                        phone: userData.phone || "",
                        photo: userData.photo || "/src/assets/default-avatar.jpg",
                        progress: {
                            tests: userData.progress?.tests || {},
                            exercises: userData.progress?.exercises || {},
                        },
                    });
                }
            } catch (error) {
                console.error("Ошибка при загрузке профиля:", error);
            } finally {
                setLoading(false);
            }
        };

        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) fetchUserData();
            else navigate("/login");
        });

        return () => unsubscribe();
    }, [navigate]);

    const getTestChartData = (scores: number[]) => {
        if (!scores.length) return [];
        const lastScore = scores[scores.length - 1];
        return [
            { name: "Правильно", value: lastScore },
            { name: "Неправильно", value: MAX_TEST_QUESTIONS - lastScore },
        ];
    };

    const getExerciseChartData = (scores: number[]) => {
        if (!scores.length) return [];
        const lastPercent = scores[scores.length - 1];
        return [
            { name: "Правильно", value: lastPercent },
            { name: "Неправильно", value: 100 - lastPercent },
        ];
    };

    if (loading) return <div>Загрузка...</div>;
    if (!user) return <div>Пользователь не найден</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={user.photo} alt="Фото профиля" className="profile-photo" />
                <div className="user-info">
                    <h2>
                        {user.name} {user.surname}
                    </h2>
                    <p><strong>Дата рождения:</strong> {user.birthdate}</p>
                    <p><strong>Город:</strong> {user.city}</p>
                    <p><strong>Школа:</strong> {user.school}</p>
                    <p><strong>Телефон:</strong> {user.phone}</p>
                </div>
                <button onClick={() => navigate("/profile/edit")} className="btn-edit">
                    Редактировать профиль
                </button>
            </div>

            <div className="progress-section">
                <h4 className="section-title">Прогресс по тестам</h4>
                <div className="charts-grid">
                    {Object.entries(user.progress.tests).map(([topicKey, scores]) => (
                        <div key={topicKey} className="chart-card">
                            <h5>{TOPIC_NAMES_RU[topicKey] || topicKey}</h5>
                            {scores.length ? (
                                <ProgressPieChart
                                    data={getTestChartData(scores)}
                                    colors={COLORS}
                                    lastResultText={`Последний результат: ${scores[scores.length - 1]} из ${MAX_TEST_QUESTIONS} (${Math.round((scores[scores.length - 1] / MAX_TEST_QUESTIONS) * 100)}%)`}
                                />
                            ) : (
                                <p>Результатов ещё нет</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="progress-section">
                <h4 className="section-title">Прогресс по тренажёрам</h4>
                <div className="charts-grid">
                    {Object.entries(user.progress.exercises).map(([topicKey, scores]) => (
                        <div key={topicKey} className="chart-card">
                            <h5>{TOPIC_NAMES_RU[topicKey] || topicKey}</h5>
                            {scores.length ? (
                                <ProgressPieChart
                                    data={getExerciseChartData(scores)}
                                    colors={COLORS}
                                    lastResultText={`Последний результат: ${scores[scores.length - 1]}%`}
                                />
                            ) : (
                                <p>Результатов ещё нет</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="logout-button">
                <button onClick={() => auth.signOut()} className="btn-logout">
                    Выйти из аккаунта
                </button>
            </div>
        </div>
    );
};

export default Profile;
