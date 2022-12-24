import Image from 'next/image';
import React, {useEffect} from 'react';
import Router, {useRouter} from "next/router";
import {validateVerifyToken} from "../../../../ts/http/userApi";
import myGif from "../../../../resources/static/Spinner-0.9s-204px.gif"
import styles from "./verify.module.scss"
import CopyText from "./copyText.svg"
import {useDispatch, useSelector} from "react-redux";
import {selectRegisterConfirm, setRegisterConfirm} from "../../../../ts/redux/authSlice";
import WsConnection from "../../../../ts/http/wsConnection";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const VerifyToken = () => {

    const registerConfimation = useSelector(selectRegisterConfirm)

    const router = useRouter()
    const { verifyToken } = router.query

    const MySwal = withReactContent(Swal)

    const dispatch = useDispatch()

    const validToken = async (verifyToken: string) => {
        try {
            const result = await validateVerifyToken(verifyToken)
            console.log(result)
        } catch (e: any) {
            if(!registerConfimation) {
                Router.push("/auth/register")
            }
            else {
                MySwal.fire({
                    title: "Successful!",
                    text: "Account has been created, you need only to login",
                    icon: "success",
                    confirmButtonText: "Login"
                }).then(r => Router.push('/auth/login'))
            }
        }
    }

    function copyText() {
        var copyText = document.getElementById("verifyToken") as HTMLElement;
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
    }

    useEffect(() => {
        if(WsConnection.socket != undefined) {
            WsConnection.socket.addEventListener("message", function (event: any) {
                WsConnection.changeConnectedStatus(true)
                const message = JSON.parse(event.data)
                if (message["verify"] != undefined) {
                    if (message["verify"]["status"] == "ok") {
                        console.log("Successful")
                        dispatch(setRegisterConfirm(true))
                    }
                }
            })
        }
    },[WsConnection.socket])

    if(verifyToken) {
        {
            validToken(verifyToken.toString())
        }
        return (
            <div>
                <div className = {styles.confirm}>
                    <h1>Waiting for confirm account...</h1>
                    <Image src={myGif} alt="my gif" height={200} width={200} />
                    <p>Send this command to our telegram bot: @speakupconf_bot</p>
                    <input value = {"/verify " + verifyToken} id = {"verifyToken"} className = {styles.verifyToken} />
                    <button onClick={() => copyText()}>
                        <CopyText />
                    </button>
                </div>
            </div>
        );
    }
};

export default VerifyToken;