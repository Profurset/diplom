import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileEdit.css";

interface UserData {
    name: string;
    surname: string;
    birthdate: string;
    city: string;
    school: string;
    phone: string;
    photo: string;
}

const ProfileEdit = () => {
    const [user, setUser] = useState<UserData>({
        name: "",
        surname: "",
        birthdate: "",
        city: "",
        school: "",
        phone: "",
        photo: "/src/assets/default-avatar.jpg",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = auth.currentUser?.uid;
            if (!userId) return;

            const userDocRef = doc(db, "users", userId);
            const snapshot = await getDoc(userDocRef);

            if (snapshot.exists()) {
                const userData = snapshot.data() as Partial<UserData>;
                setUser({
                    name: userData.name || "",
                    surname: userData.surname || "",
                    birthdate: userData.birthdate || "",
                    city: userData.city || "",
                    school: userData.school || "",
                    phone: userData.phone || "",
                    photo: userData.photo || "/src/assets/default-avatar.jpg",
                });
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {
            name: user.name,
            surname: user.surname,
            birthdate: user.birthdate,
            city: user.city,
            school: user.school,
            phone: user.phone,
            photo: user.photo,
        });

        navigate("/profile");
    };

    return (
        <div className="profile-container">
            <h2>Редактирование профиля</h2>

            <div className="form-group">
                <label>Имя:</label>
                <input type="text" name="name" value={user.name} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Фамилия:</label>
                <input type="text" name="surname" value={user.surname} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Дата рождения:</label>
                <input type="date" name="birthdate" value={user.birthdate} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Город:</label>
                <input type="text" name="city" value={user.city} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Школа:</label>
                <input type="text" name="school" value={user.school} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Номер телефона:</label>
                <input type="tel" name="phone" value={user.phone} onChange={handleChange} placeholder="+7 (999) 999-99-99" />
            </div>

            <div className="form-group">
                <label>Загрузить аватар по ссылке:</label>
                <input type="text" name="photo" value={user.photo} onChange={handleChange} />
            </div>

            <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginTop: "20px" }}>
                <button onClick={handleSave} className="btn-save">Сохранить изменения</button>
                <button onClick={() => navigate(-1)} className="btn-cancel">Отмена</button>
            </div>
        </div>
    );
};

export default ProfileEdit;