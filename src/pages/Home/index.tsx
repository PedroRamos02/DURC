import { useState } from "react";
import style from "./Home.module.css"

const Home = () => {

    const [image, setImage] = useState<string | null>(null);
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
      }
    };

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
            //value={formData.username}
            //onChange={handleChange}
          />
          <input
            className={style.register_input}
            placeholder="Email"
            type="email"
            name="email"
            //value={formData.email}
            //onChange={handleChange}
          />
          <input
            className={style.register_input}
            placeholder="Informe sua senha"
            type="password"
            name="password"
            //value={formData.password}
            //onChange={handleChange}
          />
        </div>
      </div>
      <button className={style.edit_button}>Salvar</button>
    </div>
  )
}

export default Home;