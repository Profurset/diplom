
import "../styles/Learning.css";

const Learning = () => {
    return (
        <div className="learning-container">
            <h2>Обучение</h2>
            <div className="learning-sections">
                <div className="section-card">
                    <h3>Тренажеры</h3>
                    <p>Игровые упражнения для закрепления знаний.</p>
                    <a href="/exercises" className="btn">Начать</a>
                </div>
                <div className="section-card">
                    <h3>Тесты</h3>
                    <p>Проверьте свои знания в игровой форме.</p>
                    <a href="/tests" className="btn">Начать</a>
                </div>
                <div className="section-card">
                    <h3>Теория</h3>
                    <p>Узнайте новое в интересной форме.</p>
                    <a href="/theory" className="btn">Начать</a>
                </div>
            </div>
        </div>
    );
};

export default Learning;