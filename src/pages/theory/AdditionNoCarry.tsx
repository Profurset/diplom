import styles from '../../styles/TheoryDetail.module.css';

const AdditionNoCarry = () => {
    return (
        <div className={styles['theory-detail-container']}>
            <h2 className={styles.title}>Сложение без перехода через десяток</h2>
            <p className={styles.text}>
                Это самый простой способ сложения чисел, когда сумма не выходит за пределы десятка.
                Например: 3 + 4 = 7.
            </p>
            <h3 className={styles.subtitle}>Правило:</h3>
            <p className={styles.text}>
                Чтобы сложить два числа без перехода через десяток, просто прибавь единицы к единицам.
            </p>
            <h3 className={styles.subtitle}>Примеры:</h3>
            <div className={styles.example}>
                2 + 3 = 5<br/>
                6 + 1 = 7<br/>
                4 + 4 = 8<br/>
                1 + 8 = 9
            </div>
            <div className={styles.subtitle}>Задачи для понимания:</div>
            <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
                <li>Коля собрал 4 яблока, а Оля — 2. Сколько всего?</li>
                <li>На столе лежало 5 карандашей, положили ещё 3. Сколько стало?</li>
            </ul>
            <div className={styles['video-wrapper']}>
                <iframe
                    src="https://rutube.ru/play/embed/ba95446765c77474415182a6de6b8cad/"
                    title="Видео по теме"
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

export default AdditionNoCarry;