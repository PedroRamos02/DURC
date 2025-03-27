import { useState } from "react";
import style from "./Register.module.css";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Senhas devem ser iguais. Por favor, tente novamente.");
      return;
    }

    const userData = {
      user: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        profile_picture: image,
      },
    };

    try {
      const response = await fetch(`https://hkm0v2okk3.execute-api.us-west-2.amazonaws.com/dev/users/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(userData),
      });
      

      if (!response.ok) {
        throw new Error("Erro ao criar usuário");
      }

      const data = await response.json();
      console.log(data);
      alert("Cadastro realizado!");
      navigate("/")
    } catch (erro) {
      console.error(erro);
    }
  };

  return (
    <div className={style.register}>
      <form className={style.register_form} onSubmit={handleSubmit}>
        <a href="/"><img src="./src/assets/arrow.png" /></a>
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
        <input
          className={style.register_input}
          placeholder="Nome de usuário"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          className={style.register_input}
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className={style.register_input}
          placeholder="Informe sua senha"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          className={style.register_input}
          placeholder="Confirme sua senha"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit" className={style.register_button}>Criar conta</button>
      </form>
    </div>
  );
};
