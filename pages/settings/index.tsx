import React, {useState} from 'react';
import {logOut, userChangePassword, userCreateChat} from "../../ts/http/userApi";
import styles from "./settings.module.scss"
import ErrorHandler, {ErrorException} from "../../ts/errorHandler";
import Link from "next/link";
import {useRouter} from "next/router";

const Index = () => {

    const router = useRouter();

    const [newPassword,setNewPassword] = useState("")
    const [password,setPassword] = useState("")

    const [chatUsername,setChatUsername] = useState("")

    const changePassword = async () => {
        const result = await userChangePassword(password,newPassword)
        if(result.status == 200) {
            ErrorHandler({
                title: "Успешно",
                text: "Пароль успешно изменён",
                icon: "success",
                confirmButtonText: "Ок"
            })
        } else ErrorException()
    }

    const createChat = async () => {
        const result = await userCreateChat(chatUsername);
        if(result.status == 200){
            ErrorHandler({
                title: "Успешно",
                text: "Чат создан",
                icon: "success",
                confirmButtonText: "Ок"
            })
        } else ErrorException()
    }

    if(router) {
        return (
            <div className={styles.settings}>
                <Link href={"/"} style={{float: "right"}}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM0.8 16C0.8 24.3947 7.60527 31.2 16 31.2C24.3947 31.2 31.2 24.3947 31.2 16C31.2 7.60527 24.3947 0.8 16 0.8C7.60527 0.8 0.8 7.60527 0.8 16Z"
                            fill="#2E4A63"/>
                        <path
                            d="M21.7267 16C21.7274 15.6487 21.6939 15.2982 21.6267 14.9533L23.02 14.1533L21.1067 10.82L19.72 11.62C19.184 11.1658 18.5694 10.8133 17.9067 10.58V9H14.0933V10.6067C13.4306 10.84 12.8161 11.1924 12.28 11.6467L10.8933 10.8467L8.98001 14.18L10.3733 14.98C10.24 15.6714 10.24 16.3819 10.3733 17.0733L8.98001 17.8733L10.8933 21.2067L12.28 20.4067C12.8161 20.8609 13.4306 21.2134 14.0933 21.4467V23H17.9067V21.3933C18.5694 21.16 19.184 20.8076 19.72 20.3533L21.1067 21.1533L23.02 17.82L21.6267 17.02C21.6922 16.6839 21.7257 16.3424 21.7267 16V16Z"
                            stroke="white" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path
                            d="M16 18.5467C17.4065 18.5467 18.5467 17.4065 18.5467 16C18.5467 14.5935 17.4065 13.4533 16 13.4533C14.5935 13.4533 13.4533 14.5935 13.4533 16C13.4533 17.4065 14.5935 18.5467 16 18.5467Z"
                            stroke="white" strokeWidth="1.5" strokeMiterlimit="10"/>
                    </svg>
                </Link>
                <h1>Информация</h1>
                <hr/>
                <h1>Сменить пароль</h1>
                <br/>
                <button onClick={async () => {
                    await logOut()
                    router.push("/auth/login")
                }}>Выйти из аккаунта
                </button>
                <input type={"password"} value={password} onChange={e => setPassword(e.target.value)} placeholder={"Старый пароль"}/>
                <input type={"password"} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder={"Новый пароль"}/>
                <button onClick={() => changePassword()}>Сменить</button>
                <h1>Создать чат</h1>
                <input value={chatUsername} onChange={e => setChatUsername(e.target.value)} placeholder={"Username"}/>
                <button onClick={() => createChat()}>Создать чат</button>
            </div>
        );
    }
};

export default Index;