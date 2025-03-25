import { useState, useEffect } from "react";
import style from "./Home.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const Home = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const username = localStorage.getItem("username") || "";
  const [showPassword, setShowPassword] = useState(false); 
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/dev/users/getUser/${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar usuário");
        }

        const data = await response.json();
        console.log(username)

        setFormData({
          username: data.message.username || "",
          email: data.message.email || "",
          password: data.message.password, 
          
        });

        if (data.message.profile_picture) {
          console.log(data.message.public_profile_picture)
          setImage(data.message.public_profile_picture);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []); 

  return (
    <div className={style.home}>
      <div className={style.home_card}>
        <label htmlFor="file-input" className={style.profile_label}>
          <div className={style.profile_picture}>
            {image ? <img src={image} alt="Profile" /> : <span>+</span>}
          </div>
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={style.hidden_input}
        />
        <div className={style.home_form}>
          <input
            className={style.register_input}
            placeholder="Nome de usuário"
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <input
            className={style.register_input}
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            className={style.register_input}
            placeholder="Informe sua senha"
            type={showPassword ? "text" : "password"} 
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <span
            className={style.toggle_password}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>
      <button className={style.edit_button}>Salvar</button>
    </div>
  );
};

export default Home;
