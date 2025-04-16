import { useState, useEffect } from "react";
import "../styles/Exercises.css";
import correctSound from "../assets/correct.mp3"; // Звук для правильного ответа
import wrongSound from "../assets/wrong.mp3"; // Звук для неправильного ответа

const Exercises = () => {
    const [difficulty, setDifficulty] = useState("easy"); // Уровень сложности
    const [question, setQuestion] = useState<string>(""); // Текущий пример
    const [answer, setAnswer] = useState<number | null>(null); // Правильный ответ
    const [options, setOptions] = useState<number[]>([]); // Варианты ответов
    const [selectedOption, setSelectedOption] = useState<number | null>(null); // Выбранный вариант
    const [correctAnswers, setCorrectAnswers] = useState(0); // Количество правильных ответов
    const [wrongAnswers, setWrongAnswers] = useState(0); // Количество неправильных ответов
    const [timeLeft, setTimeLeft] = useState(10); // Таймер (10 секунд)
    const [gameOver, setGameOver] = useState(false); // Конец игры
    const [isStarted, setIsStarted] = useState(false); // Статус запуска тренажёра

    // Генерация случайного примера
    const generateQuestion = () => {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;

        // Определяем доступные операции в зависимости от уровня сложности
        const operations =
            difficulty === "easy"
                ? ["+", "-"] as const
                : difficulty === "medium"
                    ? ["*", "/"] as const
                    : ["+", "-", "*", "/"] as const;

        const operation = operations[Math.floor(Math.random() * operations.length)];

        let result: number;

        if (operation === "+") result = num1 + num2;
        else if (operation === "-") result = num1 - num2;
        else if (operation === "*") result = num1 * num2;
        else result = Math.floor(num1 / num2);

        // Генерируем три варианта ответов (один правильный и два случайных)
        const otherOptions: number[] = [];
        while (otherOptions.length < 2) {
            const randomAnswer = Math.floor(Math.random() * 40) - 10; // Случайное число
            if (!otherOptions.includes(randomAnswer) && randomAnswer !== result) {
                otherOptions.push(randomAnswer);
            }
        }

        const allOptions = [...otherOptions, result];
        allOptions.sort(() => Math.random() - 0.5); // Перемешиваем варианты

        setQuestion(`${num1} ${operation} ${num2} = ?`);
        setAnswer(result);
        setOptions(allOptions);
        setSelectedOption(null);
        setTimeLeft(10); // Сброс таймера
    };

    // Проверка ответа
    const checkAnswer = (option: number) => {
        setSelectedOption(option); // Отмечаем выбранный вариант

        if (option === answer) {
            setCorrectAnswers((prev) => prev + 1);
            playSound(correctSound).catch((error) => console.error(error)); // Проигрываем положительный звук
        } else {
            setWrongAnswers((prev) => prev + 1);
            playSound(wrongSound).catch((error) => console.error(error)); // Проигрываем отрицательный звук
        }

        // Условие окончания игры
        if (wrongAnswers >= 5 || correctAnswers >= 15) {
            setGameOver(true);
        } else {
            setTimeout(generateQuestion, 1000); // Генерируем новый вопрос через секунду
        }
    };

    // Логика таймера
    useEffect(() => {
        if (!isStarted || gameOver) return; // Если тренажёр не запущен или игра окончена, ничего не делаем

        const timer = setTimeout(() => {
            if (timeLeft > 0 && !gameOver) {
                setTimeLeft((prev) => prev - 1);
            } else if (timeLeft === 0 && !gameOver) {
                setWrongAnswers((prev) => prev + 1); // Штраф за истечение времени
                playSound(wrongSound).catch((error) => console.error(error)); // Проигрываем отрицательный звук
                generateQuestion(); // Переходим к следующему вопросу
            }
        }, 1000);

        return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
    }, [timeLeft, gameOver, isStarted]);

    // Проигрывание звука
    const playSound = async (audioFile: string) => {
        try {
            const audio = new Audio(audioFile);
            await audio.play();
        } catch (error) {
            console.error("Ошибка воспроизведения звука:", error);
        }
    };

    // Начало тренажёра
    const startGame = () => {
        setIsStarted(true); // Запускаем тренажёр
        generateQuestion(); // Генерируем первый вопрос
    };

    // Сброс тренажёра
    const resetGame = () => {
        setIsStarted(false); // Останавливаем тренажёр
        setCorrectAnswers(0); // Сбрасываем счётчик правильных ответов
        setWrongAnswers(0); // Сбрасываем счётчик неправильных ответов
        setGameOver(false); // Сбрасываем флаг окончания игры
        setSelectedOption(null); // Сбрасываем выбранный вариант
        setQuestion(""); // Сбрасываем текущий пример
        setAnswer(null); // Сбрасываем правильный ответ
    };

    return (
        <div className="center-container">
            <div className="exercises-container">
                <h2>Тренажёр по математике</h2>
                <div>
                    <label>
                        Выберите уровень сложности:
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                            <option value="easy">Легкий</option>
                            <option value="medium">Средний</option>
                            <option value="hard">Сложный</option>
                        </select>
                    </label>
                </div>

                {/* Если тренажёр не запущен */}
                {!isStarted && !gameOver && (
                    <button onClick={startGame} className="btn">
                        Начать тренажёр
                    </button>
                )}

                {/* Если тренажёр запущен */}
                {isStarted && !gameOver && (
                    <>
                        <p>{question}</p>
                        <div className="options-container">
                            {options.map((option) => (
                                <button
                                    key={option}
                                    className={`option-btn ${
                                        selectedOption === option ? "selected" : ""
                                    }`}
                                    disabled={selectedOption !== null}
                                    onClick={() => checkAnswer(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <p>Осталось времени: {timeLeft} сек.</p>
                        <p>
                            Правильных ответов: {correctAnswers}, Неправильных: {wrongAnswers}
                        </p>
                    </>
                )}

                {/* Если игра окончена */}
                {gameOver && (
                    <div>
                        <h3>Игра окончена!</h3>
                        <p>
                            {wrongAnswers >= 5
                                ? "Вы допустили слишком много ошибок."
                                : "Вы успешно прошли тренажёр!"}
                        </p>
                        <p>Правильных ответов: {correctAnswers}</p>
                        <p>Неправильных ответов: {wrongAnswers}</p>
                        <button onClick={resetGame} className="btn">
                            Сыграть снова
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Exercises;