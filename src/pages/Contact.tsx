import React, { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Сообщение отправлено!");
    };

    return (
        <div className="contact-container">
            <h2>КОНТАКТЫ</h2>
            <p>
                Если у вас есть вопросы или предложения, свяжитесь с нами через форму ниже.
            </p>
            <form onSubmit={handleSubmit} className="contact-form">
                <input
                    type="text"
                 placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="form-input"
            />

            <input
                type="email"
                    placeholder="Ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                />
                <textarea
                    placeholder="Сообщение"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="form-textarea"
                />
                <button type="submit" className="submit-btn">
                    Отправить
                </button>
            </form>
            <div className="contact-info">
                <p>Адрес: г. Белгород, ул. Некрасова, д.5А</p>
                <p>Телефон: +7 (952) 424-97-45</p>
                <p>Email: 1558944@bsuedu.ru</p>
            </div>
        </div>
    );
};

export default Contact;