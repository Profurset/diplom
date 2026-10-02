import "../styles/Theory.css";
import { Outlet } from "react-router-dom";

const Theory = () => {
    return (
        <div className="theory-container">
            {!window.location.pathname.includes("/theory/") && (
                <div className="topics-list">
                    <h2>Выберите тему:</h2>
                    <ul>
                        <li>
                            <a href="/theory/addition-no-carry" className="topic-btn">
                                Сложение без перехода
                            </a>
                        </li>
                        <li>
                            <a href="/theory/addition-with-carry" className="topic-btn">
                                Сложение с переходом
                            </a>
                        </li>
                        <li>
                            <a href="/theory/multiplication-table" className="topic-btn">
                                Таблица умножения
                            </a>
                        </li>
                        <li>
                            <a href="/theory/equations" className="topic-btn">
                                Уравнения x + a = b
                            </a>
                        </li>
                    </ul>
                </div>
            )}

            <Outlet />
        </div>
    );
};

export default Theory;