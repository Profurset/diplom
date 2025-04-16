
import '../styles/Home.css';

const Home = () => { return (
    <div className="home-banner"> <div className="welcome-section"> <div className="welcome-text">
        <h1>Добро пожаловать в Мир знаний!</h1>
        <p>Рады видеть вас в нашем образовательном пространстве!
            Мы готовы помочь вам на пути к новым вершинам.
        </p>
        <a href="/register" className="btn">Начать обучение
        </a>
    </div>
        <div className="welcome-image"> <img src="..\src\assets\КОТИК.jpg" alt="Обучаем играючи" />
            <div className="image-overlay"> <p>Обучаем играючи</p> </div> </div> </div> </div> ); }

export default Home;
