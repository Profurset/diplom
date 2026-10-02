
import "../styles/Learning.css";

const Learning = () => {
    return (
        <div className="learning-container">
            <h2>ОБУЧЕНИЕ</h2>
            <p>
                Здесь вы найдёте все необходимые материалы для обучения вашего ребёнка. Выбирайте раздел, который вам нужен!
            </p>
            <div className="learning-sections">
                <div className="section-card">
                    <h3>Тренажёры</h3>
                    <p>Игровые упражнения для закрепления базовых навыков.</p>
                    <a href="/exercises" className="btn">Перейти</a>
                </div>
                <div className="section-card">
                    <h3>Тесты</h3>
                    <p>Проверьте знания вашего ребёнка с помощью наших тестов.</p>
                    <a href="/tests" className="btn">Перейти</a>
                </div>
                <div className="section-card">
                    <h3>Теория</h3>
                    <p>Узнайте новое и закрепите свои знания!</p>
                    <a href="/theory" className="btn">Перейти</a>
                </div>
            </div>
        </div>
    );
};

export default Learning;