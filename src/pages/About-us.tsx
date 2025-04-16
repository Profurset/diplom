
import "../styles/About-us.css";

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <h2>О нас</h2>
            <p>
                Привет! Меня зовут [Ваше имя], и я создал этот образовательный ресурс для детей младшего школьного возраста.
            </p>
            <img src="path/to/your/photo.jpg" alt="Фото создателя" className="creator-image" />
            <div className="social-links">
                <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-vk"></i>
                </a>
                <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-telegram"></i>
                </a>
            </div>
        </div>
    );
};

export default AboutUs;