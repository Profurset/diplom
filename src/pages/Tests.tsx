import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { saveTestResult } from "../firebaseFirestore";
import "../styles/Tests.css";

type Question = {
    question: string;
    options: string[];
    correctAnswerIndex: number;
};

type Topic = {
    id: string;
    name: string;
    questions: Question[];
    colorClass: string;
};

const topics: Topic[] = [
    {
        id: "1",
        name: "Сложение без перехода",
        questions: [
            { question: "Буратино нашёл 15 монеток, а Мальвина — 4. Сколько всего монеток у друзей?", options: ["25", "16", "19", "11"], correctAnswerIndex: 2 },
            { question: "Маша собрала 21 гриб, а Миша — 6. Сколько грибов собрались ребята вместе?", options: ["27", "70", "31", "28"], correctAnswerIndex: 0 },
            { question: "Федя купил 6 конфет, а Лука — 2. Сколько сладостей у двух мальчиков?", options: ["7", "8", "13", "10"], correctAnswerIndex: 1 },
            { question: "У Кота в сапогах было 50 золотых монет, а он нашёл ещё 2. Сколько стало?", options: ["55", "52", "59", "51"], correctAnswerIndex: 1 },
            { question: "Дюймовочка собрала 13 ягод, потом ещё 4. Сколько всего ягод она принесла домой?", options: ["15", "18", "13", "17"], correctAnswerIndex: 3 },
            { question: "Карлсон съел 31 пирожок, а Малыш — 5. Сколько пирожков исчезло за обедом?", options: ["37", "39", "36", "33"], correctAnswerIndex: 2 },
            { question: "Незнайка нарисовал 62 картинки, а Знайка — 3. Сколько всего рисунков получилось?", options: ["65", "62", "68", "66"], correctAnswerIndex: 0 },
            { question: "Винтик склеил 3 детали, а Шпунтик — 4. Сколько деталей сделали друзья вместе?", options: ["9", "5", "8", "7"], correctAnswerIndex: 3 },
            { question: "Чебурашка положил в сумку 5 апельсинов и 1 банан. Сколько фруктов в сумке?", options: ["7", "9", "6", "8"], correctAnswerIndex: 2 },
            { question: "Львёнок проплыл 21 метр, черепаха — 8. Сколько метров они проплыли вместе?", options: ["29", "25", "22", "27"], correctAnswerIndex: 0 }
        ],
        colorClass: "",
    },
    {
        id: "2",
        name: "Сложение с переходом",
        questions: [
            { question: "Красная Шапочка несла бабушке 28 пирожков, потом мама дала ещё 15. Сколько теперь пирожков?", options: ["43", "42", "44", "45"], correctAnswerIndex: 0 },
            { question: "Золушка вымыла 39 тарелок, а потом ещё 27. Сколько тарелок блестит чистотой?", options: ["66", "56", "67", "76"], correctAnswerIndex: 2 },
            { question: "Плюшевый мишка получил 46 подарков, а зайчик — 38. Сколько всего подарков под ёлкой?", options: ["84", "85", "74", "94"], correctAnswerIndex: 0 },
            { question: "Буратино сорвал 57 яблок, а Мальвина — 25. Сколько всего плодов собрали друзья?", options: ["82", "81", "83", "92"], correctAnswerIndex: 0 },
            { question: "Карлсон съел 19 плюшек, потом ещё 43. Сколько плюшек исчезло?", options: ["62", "63", "61", "72"], correctAnswerIndex: 0 },
            { question: "Робот Винтий насчитал 34 звезды, а его друг — 29. Сколько всего звёзд они увидели?", options: ["63", "62", "64", "65"], correctAnswerIndex: 0 },
            { question: "Шарик сфотографировал 48 деревьев, а Матроскин — 37. Сколько деревьев на фото?", options: ["85", "86", "75", "95"], correctAnswerIndex: 0 },
            { question: "Слонёнок весит 59 кг, попугай — 13. Сколько весят они вместе?", options: ["72", "71", "73", "82"], correctAnswerIndex: 2 },
            { question: "Ёжик собрал 27 грибов, белочка — 45. Сколько грибов в корзинке?", options: ["72", "73", "71", "62"], correctAnswerIndex: 1 },
            { question: "Пингвин Пётр нырял 68 секунд, потом ещё 14. Сколько всего времени он был под водой?", options: ["82", "83", "81", "92"], correctAnswerIndex: 2 }
        ],
        colorClass: "",
    },
    {
        id: "3",
        name: "Таблица умножения",
        questions: [
            { question: "У Буратино 6 карманов, в каждом по 7 монет. Сколько всего монет?", options: ["42", "48", "36", "49"], correctAnswerIndex: 0 },
            { question: "У Маши 8 машинок, у каждого по 4 колеса. Сколько всего колёс?", options: ["32", "36", "28", "40"], correctAnswerIndex: 0 },
            { question: "Золушка должна была пересчитать 9 корзин по 5 яблок. Сколько всего яблок?", options: ["45", "40", "50", "35"], correctAnswerIndex: 0 },
            { question: "Винни-Пух съел 7 горшочков мёда по 8 штук. Сколько мёдовых ложек?", options: ["56", "64", "48", "49"], correctAnswerIndex: 0 },
            { question: "Малыш съел 3 порции мороженого по 9 шариков. Сколько всего шариков?", options: ["27", "36", "18", "21"], correctAnswerIndex: 0 },
            { question: "На доске 6 рядов по 6 клеток. Сколько всего клеточек?", options: ["36", "32", "42", "48"], correctAnswerIndex: 0 },
            { question: "У Львёнка 4 коробки с игрушками, по 9 в каждой. Сколько всего игрушек?", options: ["36", "27", "45", "32"], correctAnswerIndex: 0 },
            { question: "У Незнайки 7 тетрадей, по 7 стикеров в каждой. Сколько стикеров?", options: ["49", "42", "56", "63"], correctAnswerIndex: 0 },
            { question: "Федя съел 5 шоколадных батончиков по 8 долек. Сколько долек съел Федя?", options: ["40", "35", "45", "30"], correctAnswerIndex: 0 },
            { question: "У Чипа 3 рюкзака по 6 инструментов. Сколько всего инструментов?", options: ["18", "12", "24", "16"], correctAnswerIndex: 0 }
        ],
        colorClass: "",
    },
    {
        id: "4",
        name: "Уравнения x + a = b",
        questions: [
            { question: "У Кота в сапогах было несколько монет. Он нашёл ещё 5 и стало 12. Сколько было монет?", options: ["7", "6", "8", "9"], correctAnswerIndex: 0 },
            { question: "У Дюймовочки в букете было несколько цветов. Она добавила 8 и стало 17. Сколько было сначала?", options: ["9", "10", "8", "11"], correctAnswerIndex: 0 },
            { question: "У Карлсона было x конфет. Он съел 3 и осталось 8. Сколько было конфет?", options: ["11", "10", "12", "13"], correctAnswerIndex: 0 },
            { question: "У Винтика было x гаечек. Он потерял 6, осталось 9. Сколько было?", options: ["15", "14", "16", "20"], correctAnswerIndex: 0 },
            { question: "У Малыша было x воздушных шариков. Он дал 4 другу и осталось 9. Сколько было?", options: ["13", "12", "14", "15"], correctAnswerIndex: 0 },
            { question: "У Белочки было x орешков. Она нашла ещё 10 и стало 25. Сколько было сначала?", options: ["15", "14", "16", "20"], correctAnswerIndex: 0 },
            { question: "У Плюшевого мишки было x бананов. Он съел 7, осталось 12. Сколько было?", options: ["19", "18", "20", "17"], correctAnswerIndex: 0 },
            { question: "У Зайца было x морковок. Он отдал 5, осталось 8. Сколько было морковок?", options: ["13", "12", "14", "15"], correctAnswerIndex: 2 },
            { question: "У Лисички было x грибов. Она нашла ещё 5, стало 18. Сколько было изначально?", options: ["13", "12", "14", "15"], correctAnswerIndex: 0 },
            { question: "У Кроша было x пирожных. Он съел 2 и осталось 7. Сколько было пирожных?", options: ["9", "10", "8", "6"], correctAnswerIndex: 2 }
        ],
        colorClass: "",
    },
];

const Tests = () => {
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);

    useEffect(() => {
        if (selectedTopic) {
            resetTest();
        }
    }, [selectedTopic]);

    const resetTest = () => {
        setCurrentQuestionIndex(0);
        setSelectedOptionIndex(null);
        setScore(0);
        setIsAnswered(false);
        setShowResult(false);
    };

    const startTest = (topicId: string) => {
        const topic = topics.find((t) => t.id === topicId) || null;
        setSelectedTopic(topic);
    };

    const handleOptionClick = (index: number) => {
        if (isAnswered || !selectedTopic) return;
        setSelectedOptionIndex(index);
        setIsAnswered(true);
        if (index === selectedTopic.questions[currentQuestionIndex].correctAnswerIndex) {
            setScore((prev) => prev + 1);
        }
    };

    const handleNext = () => {
        if (!selectedTopic) return;
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < selectedTopic.questions.length) {
            setCurrentQuestionIndex(nextIndex);
            setSelectedOptionIndex(null);
            setIsAnswered(false);
        } else {
            setShowResult(true);
            // Сохраняем результат в Firestore при завершении теста
            if (auth.currentUser) {
                saveTestResult(auth.currentUser.uid, score, selectedTopic.name);
            } else {
                console.warn("Пользователь не авторизован, результат не сохранён.");
            }
        }
    };

    const handleRestart = () => {
        resetTest();
    };

    const handleBack = () => {
        setShowExitModal(true);
    };

    const confirmExit = () => {
        setSelectedTopic(null);
        setShowExitModal(false);
    };

    const cancelExit = () => {
        setShowExitModal(false);
    };

    return (
        <div className="tests-container">
            {!selectedTopic && (
                <div className="topics-list">
                    <h2>Выберите тему:</h2>
                    <ul>
                        {topics.map((topic) => (
                            <li key={topic.id}>
                                <button
                                    className={`topic-button ${topic.colorClass}`}
                                    onClick={() => startTest(topic.id)}
                                >
                                    {topic.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedTopic && !showResult && (
                <div className="test-game">
                    <div className="back-button-container">
                        <button className="back-button" onClick={handleBack}>
                            Назад
                        </button>
                    </div>

                    <h2>{selectedTopic.name}</h2>
                    <div className="question-section">
                        <div className="question-text">
                            {selectedTopic.questions[currentQuestionIndex].question}
                        </div>
                        <div className="options-list">
                            {selectedTopic.questions[currentQuestionIndex].options.map(
                                (option, idx) => {
                                    let className = "option-button";
                                    if (isAnswered) {
                                        if (
                                            idx ===
                                            selectedTopic.questions[currentQuestionIndex]
                                                .correctAnswerIndex
                                        ) {
                                            className += " correct";
                                        } else if (idx === selectedOptionIndex) {
                                            className += " wrong";
                                        }
                                    }
                                    return (
                                        <button
                                            key={idx}
                                            className={className}
                                            onClick={() => handleOptionClick(idx)}
                                            disabled={isAnswered}
                                        >
                                            {option}
                                        </button>
                                    );
                                }
                            )}
                        </div>
                    </div>
                    <div className="score">
                        Вопрос {currentQuestionIndex + 1} из{" "}
                        {selectedTopic.questions.length} | Баллы: {score}
                    </div>
                    <div className="next-button-container">
                        {isAnswered && (
                            <button className="topic-button" onClick={handleNext}>
                                {currentQuestionIndex + 1 === selectedTopic!.questions.length ? "Завершить" : "Следующий вопрос"}
                            </button>
                        )}
                    </div>
                </div>
            )}

            {showResult && selectedTopic && (
                <div className="test-result">
                    <h2>Тест завершён!</h2>
                    <p>
                        Вы набрали {score} из {selectedTopic.questions.length} баллов.
                    </p>
                    <button onClick={handleRestart}>Пройти заново</button>
                    <button style={{ marginLeft: 10 }} onClick={() => setSelectedTopic(null)}>
                        Выбрать другую тему
                    </button>
                </div>
            )}

            {showExitModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Вы точно хотите выйти?</h3>
                        <p>Результат теста не сохранится.</p>
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

export default Tests;
