import styles from '../../styles/TheoryDetail.module.css';

const Equations = () => {
    return (
        <div className={styles['theory-detail-container']}>
            <h2 className={styles.title}>Решение простых уравнений</h2>
            <p className={styles.text}>
                Научись находить неизвестное число в уравнении.
            </p>
            <h3 className={styles.subtitle}>Правило:</h3>
            <p className={styles.text}>
                Чтобы найти неизвестное слагаемое, нужно из суммы вычесть известное слагаемое.
            </p>
            <h3 className={styles.subtitle}>Пример:</h3>
            <div className={styles.example}>
                x + 5 = 9<br />
                Чтобы найти x, нужно: 9 − 5 = 4<br />
                Ответ: x = 4
            </div>
            <h3 className={styles.subtitle}>Другие примеры:</h3>
            <div className={styles.example}>
                x + 3 = 7 → x = 4<br />
                6 + x = 10 → x = 4<br />
                x + 2 = 5 → x = 3
            </div>
            <h3 className={styles.subtitle}>Текстовые задачи:</h3>
            <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
                <li>Петя задумал число. Прибавил к нему 4 и получил 9. Какое число он задумал?</li>
                <li>Когда к числу прибавили 6, получилось 11. Найди число.</li>
            </ul>
            <div className={styles['video-wrapper']}>
                <iframe
                    src="https://rutube.ru/play/embed/197cf1060c9227e0fc3f9ab1fc01ad2b/"
                    title="Видео как решать уравнения"
                    allowFullScreen
                ></iframe>
            </div>
            <button className={styles['btn-back']} onClick={() => window.history.back()}>
                Назад к темам
            </button>
            <a href="/exercises" className={styles['btn-exercise']}>
                Попробовать задания
            </a>
        </div>
    );
};

export default Equations;