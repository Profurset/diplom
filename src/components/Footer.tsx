import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Навигационные ссылки */}
                <nav className="footer-nav">
                    <ul className="footer-items">
                        <li><Link to="/about-us" className="footer-link">О нас</Link></li>
                        <li><Link to="/learning" className="footer-link">Обучение</Link></li>
                        <li><Link to="/contact" className="footer-link">Контакты</Link></li>
                        <li><Link to="/faq" className="footer-link">Часто задаваемые вопросы</Link></li>
                    </ul>
                </nav>

                {/* Социальные сети */}
                <div className="footer-socials">
                    <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="social-link">
                        <i className="fa-brands fa-vk"></i>
                    </a>
                    <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="social-link">
                        <i className="fa-brands fa-telegram"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;