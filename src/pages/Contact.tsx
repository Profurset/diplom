import "../styles/Contact.css";
import {useState} from "react";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log({ name, email, message });
        alert("Сообщение отправлено!");
    };

    return (
        <div className="contact-container">
            <h2>Контакты</h2>
            <p>Адрес: [Ваш адрес]</p>
            <p>Email: [Ваш email]</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Сообщение"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default Contact;