import { useState, useEffect } from "react";
import style from "./Home.module.css";

const Home = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const id = "guilherme";

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
        const response = await fetch(`/api/dev/users/getUser/${id}`,
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

        // Atualiza o estado com os valores corretos da API
        setFormData({
          username: data.username || "",
          email: data.email || "",
          password: "", // Não preencher automaticamente por segurança
        });

        if (data.profile_picture) {
          setImage(data.profile_picture);
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
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
      </div>
      <button className={style.edit_button}>Salvar</button>
    </div>
  );
};

export default Home;
