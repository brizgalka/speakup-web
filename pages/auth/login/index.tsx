import styles from "../form.module.scss"

import Router from 'next/router'
import ErrorHandler from "../../../ts/errorHandler"
import Link from "next/link";
import {login} from "../../../ts/http/userApi";
import {useState} from "react";
import {validatePassword,validateUsername} from "../../../ts/formValidator";
import {registration} from "../../../ts/http/userApi";
import {router} from "next/client";

export default function loginPage() {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("")

    const [buttonActive,setButtonActive] = useState(true)

    function isValid(): boolean {
        return (validatePassword(password) && validateUsername(username))
    }

    const onLogin = async () => {

        if(!isValid()) { return false }

        setButtonActive(false)

        try {
            const result = await login(username,password)
            console.log(result)
            Router.push('/')
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
            <div className={styles.form} style={{"height": 300}}>
                <h1>Войти в аккаунт</h1>
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder={"Username"}/><br/>
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder={"password"}/><br/>
                <button disabled={!buttonActive} onClick={() => {
                    onLogin()
                }}>Войти</button>
                <Link href = "/auth/register">
                    <button>Зарегистрироваться</button>
                </Link>
                <Link href = "/auth/forgot-password">
                    <button>Забыли пароль</button>
                </Link>
            </div>
        </>
    )
}