import { useState } from "react";
import style from "./Register.module.css"

/*const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
*/

export const Register = () => {

  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return(
    <div className={style.register}>
      <form className={style.register_form}>
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
          placeholder='Nome de usuario'
          type="text"
          data-icon="email"
          > 
        </input>
        <input 
          className={style.register_input}
          placeholder='Email'
          type="mail"
          data-icon="email"
          > 
        </input>
        <input 
          className={style.register_input} 
          placeholder='informe sua senha'
          type="password"
          data-icon="password"
          >
        </input>
        <input 
          className={style.register_input} 
          placeholder='Confirme sua senha'
          type="password"
          data-icon="password"
          >
        </input>
        <button className={style.register_button}>Criar conta</button>
      </form>
    </div>
  )
}