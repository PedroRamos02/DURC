import style from './Login.module.css'

export const Login = () => {
  return (
    <div className={style.login}>
      <form className={style.login_form}>
        <input 
          className={style.login_input}
          placeholder='Email'
          type='mail'
          data-icon="email"
          > 
        </input>
        <input 
          className={style.login_input} 
          placeholder='Password'
          type='password'
          data-icon="password"
          >
        </input>
        <button className={style.login_button}>Login</button>
        <p>Não possui conta? <a href='/register'>Cadastre-se!</a></p>
      </form>
    </div>
  )
}