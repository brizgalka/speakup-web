import styles from "../../form.module.scss"

import { useRouter } from "next/router";
import Link from "next/link";
import {useEffect, useState} from "react";
import {validatePassword, validatePasswordMatch} from "../../../../ts/formValidator";
import {changePassword, validateHashId} from "../../../../ts/http/userApi";
import Router from "next/router";
import ErrorHandler from "../../../../ts/errorHandler";
import {hash} from "immutable";

export default function ForgotPassword() {

    const router = useRouter()
    const {hashId}= router.query

    const [password,setPassword] = useState("")
    const [passwordAgain,setPasswordAgain] = useState("")

    function isValid(): boolean {
        return (validatePassword(password) && validatePasswordMatch(password,passwordAgain))
    }

    const [buttonActive,setButtonActive] = useState(true)

    useEffect(() => {
        console.log(router.query.hashId)
    }, [router.query.hashId])

    const onChangePassword = async () => {

        if(!isValid()) { return false }

        setButtonActive(false)

        try {
            if(hashId != undefined) {
                const result = await changePassword(hashId.toString(),password)
                console.log(result)
                Router.push('/login')
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

    const validHash = async (hashId: string) => {
        try {
            const result = await validateHashId(hashId)
            console.log(result)
        } catch (e: any) {
            Router.push("/")
        }
    }

    if(hashId) {
        {
            validHash(hashId.toString())
        }
        return (
            <>
                <div className={styles.form} style={{"height": 300}}>
                    <h1>Восстановление пароля</h1>
                    <input value={password} onChange={e => setPassword(e.target.value)} placeholder={"Password"}
                           type="text"/><br/>
                    <input value={passwordAgain} onChange={e => setPasswordAgain(e.target.value)}
                           placeholder={"Password again"} type="text"/><br/>
                    <button disabled={!buttonActive} onClick={() => {
                        onChangePassword()
                    }}>Сменить пароль
                    </button>
                </div>
            </>
        )
    }
}
