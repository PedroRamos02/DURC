import style from './SubmitButton.module.css'

export const Submitbutton = (props) => {
  return(
    <button type='submit' className={style.submit_button}>{props.text}</button>
  )
}