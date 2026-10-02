import "../styles/Home.css";
import React from "react";

const Home: React.FC = () => {
    return (
        <div className="home-container">

            {/* Блок 1: Приветствие */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="multiline-title">
                        <span>Добро пожаловать в</span>
                        <span>«Мир Знаний»</span>
                    </h1>
                    <p>
                        Рады видеть Вас в нашем образовательном пространстве!
                        Мы готовы помочь Вам на пути к новым вершинам. Начните путь к мастерству уже сегодня! Погрузитесь в мир знаний, где сложное стано- вится понятным, а теория превращается в практические навыки. Ваш прогресс — наша главная цель.
                    </p>

                    <a href="/learning" className="btn-primary-container">
                        <button className="btn-primary">Начать обучение</button>
                    </a>
                </div>
                <img src="../src/assets/man3.png" alt="Звонит" className="hero-image"/>
            </section>

            {/* Блок 2: Описание преимуществ */}
            <section className="features-section">
                <h2>НАШИ ПРЕИМУЩЕСТВА</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <h3>ДОСТУПНОСТЬ</h3>
                        <p>
                            Дети, которые заинтересованы в обучении, могут посетить данный сайт и пользоваться материалами, тестами, тренажёрами — абсолютно бесплатно.
                        </p>
                    </div>
                    <div className="feature-card">
                        <h3>ПОЛЬЗА</h3>
                        <p>
                            Данный сайт предназначен для развития способностей вашего ребенка. А также, вы сможете наблюдать за его занятиями.
                        </p>
                    </div>
                    <div className="feature-card">
                        <h3>ПРОГРЕСС</h3>
                        <p>
                            В личном кабинете вы будете получать отчёт об успехах, что даёт вам возможность отслеживать прогресс ребенка.
                        </p>
                    </div>
                </div>
            </section>

            {/* Новый блок: Как это работает? */}
            <section className="how-it-works-section">
                <h2>КАК ЭТО РАБОТАЕТ?</h2>
                <div className="steps-grid">
                    <div className="step-card">
                        <span className="step-number1">1</span>
                        <h3>Регистрация</h3>
                        <p>Создайте аккаунт всего за пару кликов и начните обучение.</p>
                    </div>
                    <div className="step-card">
                        <span className="step-number2">2</span>
                        <h3>Выбор цели</h3>
                        <p>Выберите направление, которое интересует вас.</p>
                    </div>
                    <div className="step-card">
                        <span className="step-number3">3</span>
                        <h3>Обучение</h3>
                        <p>Изучайте материалы, проходите тесты и развивайтесь.</p>
                    </div>
                    <div className="step-card">
                        <span className="step-number4">4</span>
                        <h3>Прогресс</h3>
                        <p>Следите за результатами и достигайте новых высот!</p>
                    </div>
                </div>
            </section>

            {/* Новый блок: Курсы или Тренажеры */}
            <section className="courses-section">
                <h2>ОПРОБУЙТЕ НАШИ ВОЗМОЖНОСТИ</h2>
                <div className="course-grid">
                    <div className="course-card1">
                        <h3>Тренажёры</h3>
                        <p>Решайте задачи и развивайте логическое мышление.</p>
                    </div>
                    <div className="course-card2">
                        <h3>Тесты</h3>
                        <p>Усваивайте знания с помощью тестирования.</p>
                    </div>
                    <div className="course-card3">
                        <h3>Теория</h3>
                        <p>Обучайтесь новым знаниям и правилам.</p>
                    </div>
                </div>
            </section>

            {/* Новый блок: Отзывы или Успехи студентов */}
            <section className="testimonials-section">
                <h2>ЧТО ГОВОРЯТ РОДИТЕЛИ И ДЕТИ?</h2>
                <div className="testimonial-grid">
                    <div className="testimonial-card1">
                        <p>"Мои оценки стали лучше после тренировок на сайте!"</p>
                        <strong>— Анна, ученица</strong>
                    </div>
                    <div className="testimonial-card2">
                        <p>"Ребёнок теперь учится с удовольствием."</p>
                        <strong>— Екатерина, мама</strong>
                    </div>
                        <div className="testimonial-card3">
                            <p>"Хорошая структура заданий, всё понятно."</p>
                            <strong>— Иван, ученик</strong>
                        </div>
                    </div>
            </section>

            {/* Блок: Подписка */}
            <section className="signup-section">
                <h2>ОСТАЛИСЬ ВОПРОСЫ?</h2>
                <p>Подпишитесь на нашу рассылку и будьте в курсе всех новостей!</p>
                <form className="signup-form">
                    <input type="email" placeholder="Ваш email" required />
                    <button type="submit" className="btn-secondary">Подписаться</button>
                </form>
            </section>

        </div>
    );
};

export default Home;