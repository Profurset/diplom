import { useState, useEffect, useCallback } from "react";
import "../styles/Exercises.css";
import { auth } from "../firebaseConfig";
import { updateExerciseProgress } from "../firebaseFirestore";
import correctSound from "../assets/correct.mp3";
import wrongSound from "../assets/wrong.mp3";

const Exercises = () => {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<number | null>(null);
    const [options, setOptions] = useState<number[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [gameOver, setGameOver] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);

    const MAX_QUESTIONS = 10;

    const generateQuestion = useCallback(() => {
        let num1: number, num2: number, x: number, a: number, b: number, result: number;

        switch (selectedTopic) {
            case "addition-no-carry":
                num1 = Math.floor(Math.random() * 10);
                num2 = Math.floor(Math.random() * (10 - num1));
                result = num1 + num2;
                setQuestion(`${num1} + ${num2} = ?`);
                break;
            case "addition-with-carry":
                num1 = Math.floor(Math.random() * 20) + 10;
                num2 = Math.floor(Math.random() * 20) + 10;
                result = num1 + num2;
                setQuestion(`${num1} + ${num2} = ?`);
                break;
            case "multiplication-table":
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
                result = num1 * num2;
                setQuestion(`${num1} × ${num2} = ?`);
                break;
            case "equate":
                x = Math.floor(Math.random() * 10) + 1;
                a = Math.floor(Math.random() * 10) + 1;
                b = x + a;
                result = x;
                setQuestion(`x + ${a} = ${b}`);
                break;
            default:
                return;
        }

        setAnswer(result);

        const fakeOptions = new Set<number>();
        while (fakeOptions.size < 2) {
            const val = result + Math.floor(Math.random() * 10 - 5);
            if (val !== result && val > 0) fakeOptions.add(val);
        }

        const mixedOptions = [...fakeOptions, result].sort(() => Math.random() - 0.5);
        setOptions(mixedOptions);
        setTimeLeft(10);
    }, [selectedTopic]);

    const checkAnswer = (option: number) => {
        if (isAnswered) return;

        let newCorrect = correctAnswers;
        let newWrong = wrongAnswers;

        if (option === answer) {
            newCorrect++;
            setCorrectAnswers(newCorrect);
            new Audio(correctSound).play().catch(() => {});
        } else {
            newWrong++;
            setWrongAnswers(newWrong);
            new Audio(wrongSound).play().catch(() => {});
        }

        setIsAnswered(true);

        setTimeout(() => {
            setIsAnswered(false);
            if (newCorrect >= MAX_QUESTIONS || newWrong >= 3) {
                setGameOver(true);
            } else {
                generateQuestion();
            }
        }, 1500);
    };

    useEffect(() => {
        if (!isStarted || gameOver || !selectedTopic) return;

        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft((prev) => prev - 1);
            } else {
                setWrongAnswers((prev) => prev + 1);
                generateQuestion();
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, gameOver, isStarted, selectedTopic, generateQuestion]);

    useEffect(() => {
        if (gameOver) {
            const saveProgress = async () => {
                const userId = auth.currentUser?.uid;
                if (!userId || !selectedTopic) return;

                const total = correctAnswers + wrongAnswers;
                const percent = total > 0 ? Math.round((correctAnswers / total) * 100) : 0;

                await updateExerciseProgress(userId, selectedTopic, percent);
            };
            saveProgress();
        }
    }, [gameOver, correctAnswers, wrongAnswers, selectedTopic]);

    useEffect(() => {
        if (selectedTopic && !isStarted && !gameOver) {
            setIsStarted(true);
            generateQuestion();
        }
    }, [selectedTopic, isStarted, gameOver, generateQuestion]);

    const resetGame = () => {
        setIsStarted(false);
        setCorrectAnswers(0);
        setWrongAnswers(0);
        setGameOver(false);
        setQuestion("");
        setAnswer(null);
        setIsAnswered(false);
        setShowExitModal(false);
        setTimeLeft(10);
    };

    const handleBack = () => {
        setShowExitModal(true);
    };

    const confirmExit = () => {
        setSelectedTopic(null);
        resetGame();
    };

    const cancelExit = () => {
        setShowExitModal(false);
    };

    return (
        <div className="exercises-container">
            {!selectedTopic && (
                <div className="topics-list">
                    <h2>Выберите тему:</h2>
                    <ul>
                        <li>
                            <button onClick={() => setSelectedTopic("addition-no-carry")} className="topic-btn">
                                Сложение без перехода
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setSelectedTopic("addition-with-carry")} className="topic-btn">
                                Сложение с переходом
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setSelectedTopic("multiplication-table")} className="topic-btn">
                                Таблица умножения
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setSelectedTopic("equate")} className="topic-btn">
                                Уравнения x + a = b
                            </button>
                        </li>
                    </ul>
                </div>
            )}

            {isStarted && !gameOver && (
                <>
                    <div className="back-button-container">
                        <button className="back-button" onClick={handleBack}>
                            Назад
                        </button>
                    </div>

                    <p className={`question fade-in ${isAnswered ? "answered" : ""}`}>{question}</p>
                    <div className="options-container">
                        {options.map((option, index) => (
                            <button
                                key={index}
                                className={`option-btn fade-in ${
                                    isAnswered && option === answer ? "correct" : ""
                                } ${isAnswered && option !== answer ? "wrong" : ""}`}
                                onClick={() => checkAnswer(option)}
                                disabled={isAnswered}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <p className="timer">Осталось времени: {timeLeft} сек.</p>
                    <p className="score">
                        Правильных: {correctAnswers} | Ошибок: {wrongAnswers}
                    </p>
                </>
            )}

            {gameOver && (
                <div className="game-over">
                    <h3>Игра окончена!</h3>
                    <p>{wrongAnswers >= 3 ? "Слишком много ошибок." : "Вы успешно прошли!"}</p>
                    <p className="final-score">
                        Правильных ответов: {correctAnswers} из {correctAnswers + wrongAnswers}
                    </p>
                    <p>
                        Процент правильных:{" "}
                        {Math.round((correctAnswers / (correctAnswers + wrongAnswers)) * 100)}%
                    </p>

                    <button onClick={resetGame} className="reset-btn">
                        Сыграть снова
                    </button>

                    <button
                        onClick={() => {
                            setSelectedTopic(null);
                            resetGame();
                        }}
                        className="return-topics-btn"
                    >
                        Вернуться к темам
                    </button>
                </div>
            )}

            {showExitModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Вы точно хотите выйти?</h3>
                        <p>Результат не сохранится.</p>
                        <div className="modal-buttons">
                            <button className="modal-btn confirm" onClick={confirmExit}>
                                Да, выйти
                            </button>
                            <button className="modal-btn cancel" onClick={cancelExit}>
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Exercises;
