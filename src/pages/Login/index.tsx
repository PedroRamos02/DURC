import { useNavigate } from 'react-router-dom';
import style from './Login.module.css'
import { useState } from 'react';

export const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userData = {
      user: {
        username: formData.username,
        password: formData.password,
      },
    };
    

    try {
      const response = await fetch(`/api/dev/users/authUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer login. Verifique suas credenciais.");

      }

      const data = await response.json();
      console.log(data);
      console.log(response)
      localStorage.setItem("username", formData.username);


      alert("Login realizado com sucesso!");
      navigate("/home"); 
    } catch (erro) {
      console.error(erro);
      alert("Falha no login. Verifique seus dados e tente novamente.");
    }
  };

  return (
    <div className={style.login}>
      <form className={style.login_form} onSubmit={handleSubmit}>
        <input 
          className={style.login_input}
          placeholder='Nome de usuario'
          type='username'
          name='username'
          data-icon="email"
          value={formData.username}
          onChange={handleChange}
          > 
        </input>
        <input 
          className={style.login_input} 
          placeholder='Password'
          type='password'
          name='password'
          data-icon="password"
          value={formData.password}
          onChange={handleChange}
          >
        </input>
        <button type="submit" className={style.login_button}>Login</button>
        <p>Não possui conta? <a href='/register'>Cadastre-se!</a></p>
      </form>
    </div>
  )
}