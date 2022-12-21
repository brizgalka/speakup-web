import styles from "./form.module.scss"

import { setAuthPage } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

export default function registerPage() {

    const dispatch = useDispatch();

    return(
        <>
            <div className={styles.form} style={{"height": 400}}>
                <h1>Зарегистрироваться</h1>
                <input/><br/>
                <input/><br/>
                <input/><br/>
                <input/><br/>
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
