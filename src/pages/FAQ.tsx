
import "../styles/FAQ.css";

const FAQ = () => {
    const faqItems = [
        { question: "Как начать обучение?", answer: "Зарегистрируйтесь и выберите раздел." },
        { question: "Бесплатно ли это?", answer: "Да, все материалы бесплатны." },
    ];

    return (
        <div className="faq-container">
            <h2>Часто задаваемые вопросы</h2>
            {faqItems.map((item, index) => (
                <div key={index} className="faq-item">
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                </div>
            ))}
            <form>
                <input type="text" placeholder="Ваш вопрос" />
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default FAQ;