import type { NextPage } from "next";
import styles from "./form.module.scss"

import { setAuthPage } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

const loginPage = () => {

    const dispatch = useDispatch();

    return(
        <>
            <div className={styles.form} style={{"height": 300}}>
                <h1>Войти в аккаунт</h1>
                <input placeholder={"Username"}/><br/>
                <input placeholder={"password"}/><br/>
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

export default loginPage;