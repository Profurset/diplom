import styles from '../../styles/TheoryDetail.module.css';

const MultiplicationTable = () => {
    return (
        <div className={styles['theory-detail-container']}>
            <h2 className={styles.title}>Таблица умножения</h2>
            <p className={styles.text}>
                Таблица умножения — основа арифметики. Учись быстро и легко!
            </p>
            <h3 className={styles.subtitle}>Как учить таблицу:</h3>
            <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
                <li>Начни с малого: учи по одному столбцу в день.</li>
                <li>Используй игры и карточки для запоминания.</li>
                <li>Повторяй регулярно для закрепления.</li>
            </ul>
            <h3 className={styles.subtitle}>Примеры:</h3>
            <div className={styles.example}>
                2 × 3 = 6<br />
                5 × 5 = 25<br />
                9 × 7 = 63
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", margin: "20px 0" }}>
                <tbody>
                {Array.from({ length: 10 }, (_, i) => (
                    <tr key={i}>
                        {Array.from({ length: 10 }, (_, j) => (
                            <td key={j} style={{
                                padding: "8px",
                                textAlign: "center",
                                border: "1px solid #ccc"
                            }}>
                                {(i + 1) * (j + 1)}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={styles.subtitle}>Практические задачи:</div>
            <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
                <li>Сколько будет 3 × 4? А 4 × 3?</li>
                <li>Если у тебя 5 ручек, и ты хочешь купить столько же — сколько всего?</li>
            </ul>
            <div className={styles['video-wrapper']}>
                <iframe
                    src="https://rutube.ru/play/embed/90ca08923a81b0abd059a0abb80980b2/"
                    title="Видео по таблице умножения"
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

export default MultiplicationTable;