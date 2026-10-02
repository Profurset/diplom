import styles from '../../styles/TheoryDetail.module.css';

const AdditionWithCarry = () => {
    return (
        <div className={styles['theory-detail-container']}>
            <h2 className={styles.title}>Сложение с переходом через десяток</h2>
            <p className={styles.text}>
                Этот метод применяется, когда сумма единиц больше или равна 10.
                Например: 8 + 5 = 13.
            </p>
            <h3 className={styles.subtitle}>Как это работает:</h3>
            <div className={styles.example}>
                Возьмем пример: 9 + 6<br />
                Сначала доводим до 10: 9 + 1 = 10<br />
                Остается прибавить еще 5: 10 + 5 = 15
            </div>
            <h3 className={styles.subtitle}>Другие примеры:</h3>
            <div className={styles.example}>
                7 + 8 = 15<br />
                6 + 9 = 15<br />
                8 + 8 = 16
            </div>
            <h3 className={styles.subtitle}>Практические задачи:</h3>
            <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
                <li>Маша купила 8 конфет, бабушка дала ещё 7. Сколько всего?</li>
                <li>В коробке было 9 машинок, положили ещё 6. Сколько стало?</li>
            </ul>
            <div className={styles['video-wrapper']}>
                <iframe
                    src="https://rutube.ru/play/embed/e28a141107fc30479ed0ca4961e4f2d2/"
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

export default AdditionWithCarry;