
import "../styles/FAQ.css";

const FAQ = () => {
    const faqItems = [
        {
            question: "Как начать обучение?",
            answer: "Просто зарегистрируйтесь и выберите раздел обучения.",
        },
        {
            question: "Бесплатно ли это?",
            answer: "Да, все материалы бесплатны.",
        },
        {
            question: "Можно ли получить сертификат?",
            answer: "Пока что нет, но мы планируем добавить эту функцию в будущем.",
        },
    ];

    return (

        <div className="faq-container">
            <h2>ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</h2>
            {faqItems.map((item, index) => (
                <div key={index} className="faq-item">
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                </div>
            ))}
            <div className="contact-us">
                <h3>Не нашли ответ?</h3>
                <p>Свяжитесь с нами через форму обратной связи.</p>
                <a href="/contact" className="btn">Написать нам</a>
            </div>
        </div>
    );
};

export default FAQ;