import styles from "./form.module.scss"

import { setAuthPage } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

export default function forgotPassword() {

    const dispatch = useDispatch();

    return(
        <>
            <div className={styles.form} style={{"height": 250}}>
                <h1>Восстановление пароля</h1>
                <input placeholder={"email"} type = "email"/><br/>
                <button onClick={() => {
                    dispatch(setAuthPage("login"))
                }}>Войти</button>
                <button onClick={() => {
                    dispatch(setAuthPage("register"))
                }}>Зарегистрироваться</button>
                <button onClick={() => {
                    dispatch(setAuthPage("forgot-password"))
                }}>Забыли пароль</button>
            </div>
        </>
    )
}
