
import "../styles/Profile.css";

const Profile = () => {
    const user = {
        name: "Иванов Иван",
        photo: "path/to/photo.jpg",
        progress: { tests: 80, theory: 95 },
    };

    return (
        <div className="profile-container">
            <h2>Личный кабинет</h2>
            <img src={user.photo} alt="Фото профиля" className="profile-photo" />
            <h3>{user.name}</h3>
            <p>Прогресс по тестам: {user.progress.tests}%</p>
            <p>Прогресс по теории: {user.progress.theory}%</p>
        </div>
    );
};

export default Profile;