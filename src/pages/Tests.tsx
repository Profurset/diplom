import "../styles/Tests.css";
import { useState } from "react";
import { saveTestResult } from "../firebaseFirestore"; // Импортируем функцию для сохранения результата

const Tests = () => {
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]); // Состояние для выбранных ответов
    const [userId] = useState("sampleUserId"); // Пример ID пользователя

    const questions = [
        { id: 1, question: "Какой сейчас год?", options: ["2024", "2025", "2023"], answer: "2025" },
        { id: 2, question: "Сколько будет 2 + 2?", options: ["3", "4", "5"], answer: "4" },
    ];

    const handleAnswerChange = (questionId: number, answer: string) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[questionId] = answer;
        setSelectedAnswers(newAnswers);
    };

    const handleSubmit = async () => {
        const score = selectedAnswers.filter((answer, index) => answer === questions[index].answer).length;
        try {
            // Сохраняем результат в Firestore
            await saveTestResult(userId, score);
            alert(`Ваш результат: ${score}`);
        } catch (error) {
            console.error("Ошибка при сохранении результата:", error);
        }
    };

    return (
        <div className="tests-container container center">
            <h2 className="title">Тесты</h2>
            <div className="questions-container">
                {questions.map((q, index) => (
                    <div key={q.id} className="question-card">
                        <p className="question">{q.question}</p>
                        <div className="options">
                            {q.options.map((option, i) => (
                                <label key={i} className="option">
                                    <input
                                        type="radio"
                                        name={`question-${q.id}`}
                                        value={option}
                                        checked={selectedAnswers[index] === option}
                                        onChange={() => handleAnswerChange(index, option)}
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit} className="btn submit-btn">
                Отправить результаты
            </button>
        </div>
    );
};

export default Tests;
