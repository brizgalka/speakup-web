import styles from "../form.module.scss"

import ErrorHandler from "../../../ts/errorHandler"
import { useDispatch } from "react-redux";
import Link from "next/link";
import {useState} from "react";
import {validatePassword, validateUsername} from "../../../ts/formValidator";
import {forgotPassword} from "../../../ts/http/userApi";
import Router from "next/router";

export default function ForgotPassword() {

    const [username,setUsername] = useState("")

    const dispatch = useDispatch();

    const [buttonActive,setButtonActive] = useState(true)

    function isValid(): boolean {
        return (validateUsername(username))
    }

    const onForgot = async () => {

        if(!isValid()) { return false }

        setButtonActive(false)

        try {
            const result = await forgotPassword(username)
            ErrorHandler({
                title: "Ops!",
                text: "Код был отправлен",
                icon: "success",
                confirmButtonText:"ok"
            })
        } catch (e: any) {
            setButtonActive(true)
            ErrorHandler({
                title: "Ops!",
                text: "something went wrong, try again later",
                icon: "error",
                confirmButtonText:"ok"
            })
        }
    }

    return(
        <>
            <div className={styles.form} style={{"height": 250}}>
                <h1>Восстановление пароля</h1>
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder={"Username"} type = "text"/><br/>
                <Link href = "/auth/login">
                    <button>Войти</button>
                </Link>
                <Link href = "/auth/register">
                    <button>Зарегистрироваться</button>
                </Link>
                <button disabled={!buttonActive} onClick={() => {
                    onForgot()
                }}>Забыли пароль</button>
            </div>
        </>
    )
}
