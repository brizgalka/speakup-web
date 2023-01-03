import styles from "../form.module.scss"

import Router from 'next/router'
import ErrorHandler from "../../../ts/errorHandler"
import Link from "next/link";
import {login} from "../../../ts/http/userApi";
import {useState} from "react";
import {validatePassword,validateUsername} from "../../../ts/formValidator";
import {setId, setIsLoggened, setToken, setUsername} from "../../../ts/redux/authSlice";
import {useDispatch} from "react-redux";
import WsConnection from "../../../ts/http/wsConnection";
import Head from "next/head";

export default function LoginPage() {

    const dispatch = useDispatch()

    const [username,setUsernameInput] = useState("");
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
            const token = result.data.token
            const id = result.data.id
            if(result.status == 200) {
                console.log(result)
                dispatch(setIsLoggened(true))
                dispatch(setUsername(username))
                dispatch(setToken(token))
                dispatch(setId(id))
                WsConnection.authConnection(token)
                await Router.push("/")
            } else {
                ErrorHandler({
                    title: "Ops!",
                    text: result.data,
                    icon: "error",
                    confirmButtonText:"ok"
                })
                setButtonActive(true)
            }
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
            <Head>
                <title>Login</title>
                <meta name="description" content="Login to SpeakUp"/>
                <link rel="icon" href = "/favicon.png"/>
            </Head>
            <div className={styles.form} style={{"height": 300}}>
                <h1>Войти в аккаунт</h1>
                <input value={username} onChange={e => setUsernameInput(e.target.value)} placeholder={"Username"}/><br/>
                <input type={"password"} value={password} onChange={e => setPassword(e.target.value)} placeholder={"password"}/><br/>
                <button disabled={!buttonActive} onClick={async () => {
                    await onLogin()
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