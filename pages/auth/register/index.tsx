import styles from "../form.module.scss"

import Link from 'next/link'
import ErrorHandler from "../../../ts/errorHandler"
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {validateEmail, validatePassword, validatePasswordMatch, validateUsername} from "../../../ts/formValidator";
import {registration} from "../../../ts/http/userApi";
import Router from "next/router";
import {setRegisterConfirm} from "../../../ts/redux/authSlice";

export default function Register() {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [passwordAgain,setPasswordAgain] = useState("")
    const [email,setEmail] = useState("")

    const [buttonActive,setButtonActive] = useState(true)

    const dispatch = useDispatch();

    function isValid(): boolean {
        return (validatePassword(password) && validatePasswordMatch(password,passwordAgain) && validateEmail(email) && validateUsername(username))
    }

    const onRegister = async () => {

        if(!isValid()) { return false }

        setButtonActive(false)

        try {
            const result = await registration(email,password,passwordAgain,username)
            if(result) {
                console.log(result.data)
                dispatch(setRegisterConfirm(false))
                Router.push(`/auth/register/confirm-registration/${result.data.verifyToken}`)
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
            <div className={styles.form} style={{"height": 400}}>
                <h1>Зарегистрироваться</h1>
                <input value = {username} onChange={e => setUsername(e.target.value)} placeholder={"Username"}/><br/>
                <input value = {password} onChange={e => setPassword(e.target.value)} placeholder={"Password"} type = 'password'/><br/>
                <input value = {passwordAgain} onChange={e => setPasswordAgain(e.target.value)} placeholder={"Password again"} type = 'password'/><br/>
                <input value = {email} onChange={e => setEmail(e.target.value)} placeholder={"Email"} type = "email"/><br/>
                <Link href = "/auth/login">
                    <button>Войти</button>
                </Link>
                <button disabled={!buttonActive} onClick={() => {
                    onRegister()
                }}>Зарегистрироваться</button>
                <Link href = "/auth/forgot-password">
                    <button>Забыли пароль</button>
                </Link>
            </div>
        </>
    )
}
