import styles from "./index.module.scss"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectIsLoggened, selectUsername} from "../../ts/redux/authSlice";
import {getDialogInfo, getDialogs, getMessages, getUserLogo, sendMessage} from "../../ts/http/userApi";
import DialogChat from "./DialogChat";
import {selectCurrentChat, selectCurrentMessage, setCurrentMessage} from "../../ts/redux/chatSlice";
import NoDialog from "./NoDialog";
import Head from "next/head";
import Message from "./message"
import ErrorHandler from "../../ts/errorHandler";
import Link from "next/link";
import useWindowSize from "../../hooks/useWindowSize";
import {booleanLiteral} from "@babel/types";

export default function Index() {

    interface chatInterface {
        id: number;
        DialogName: string;
    }

    interface messageInterface {
        message: string;
    }

    const size = useWindowSize();

    const isLoggined = useSelector(selectIsLoggened)
    const username = useSelector(selectUsername)

    const [messages,setMessages] = useState<messageInterface[]>([]);

    const message = useSelector(selectCurrentMessage)
    const chatId = useSelector(selectCurrentChat)

    const dispatch = useDispatch()

    const [user1chats,setUser1Chats] = useState<chatInterface[]>([])
    const [user2chats,setUser2Chats] = useState<chatInterface[]>([])

    const [chatInfo,setChatInfo] = useState({})

    const [buttonActive,setButtonActive] = useState(true)

    const currentChat = useSelector(selectCurrentChat)

    useEffect(() => {
        async function fetchData() {
            try {
                if(chatId != undefined) return await getMessages(chatId)
            } catch (e: any) {
                //pass
            }
        }

        const fetchDialogInfo = async () => {
            try {
                if(chatId != undefined) return await getDialogInfo(chatId)
            } catch (e: any) {
                //pass
            }
        }

        fetchDialogInfo().then(r => {
            if(r != undefined) {
                if(r.status == 200) {
                    const result = r.data
                    setChatInfo({
                        logo: process.env.NEXT_PUBLIC_apiHost + "api/static/getUserLogo?username=default",
                        chatName: result.DialogName
                    })
                }
            }
        })

        fetchData().then(r => {
            if(r != undefined) {
                if (r.status == 200) {
                    const result = r.data
                    setMessages(result)
                }
            }
        })
    },[chatId])

    const chatSendMessage = async () => {
        if(!(message == "" || message == undefined)) {
            setButtonActive(false)
            try {
                let result = undefined
                if(chatId != undefined) result = await sendMessage(chatId, message)
                if (result) {
                    setButtonActive(true)
                    dispatch(setCurrentMessage(""))
                    // @ts-ignore
                    setMessages([...messages,{
                        message,
                    }])
                } else {
                    setButtonActive(true)
                    ErrorHandler({
                        title: "Error",
                        icon: "error",
                        text: "Error",
                        confirmButtonText: "try again"
                    })
                }
            } catch (e: any) {
                setButtonActive(true)
            }
        }
    }

    useEffect(() => {

        const fetchDialogs = async () => {
            try {
                return await getDialogs()
            } catch (e: any) {
                //pass
            }
        }

        if(isLoggined) {
            fetchDialogs().then(r => {
                if(r != undefined) {
                    if (r.status == 200) {
                        const result = r.data
                        setUser1Chats(result["user1"])
                        setUser2Chats(result["user2"])
                    }
                }
            })
        }
    },[isLoggined])

    function renderNoChats() {
        if(user1chats.length == 0 && user2chats.length == 0) {
            return <DialogChat chatId={1} logo = "default" key = {Date.now()} chatName={String(Math.random())} />
        }
    }

    function isMobile() {
        if(size.width != undefined) return size.width < 550
    }

    function canRender():boolean { return (isLoggined != undefined && typeof window !== 'undefined') }

    if(canRender()) {
        return (
            <main className={styles.web}>
                <Head>
                    <title>SpeakUp</title>
                    <meta name="description" content="SpeakUp main page"/>
                    <link rel="icon" href = "/favicon.png"/>
                </Head>
                <header className={styles.headerContent}>
                    <div>
                        <nav className={styles.userInfo}>
                            <img src = {process.env.NEXT_PUBLIC_apiHost + "api/static/getUserLogo?username=default"}/>
                            <div>
                                <p>{username}</p>
                                <p>Custom status...</p>
                            </div>
                            <Link href={"/settings"}>
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
                        </nav>
                        <nav></nav>
                        <nav></nav>
                    </div>
                </header>
                <div className={styles.mess}>
                    <ul className={styles.chats} style={(isMobile() && currentChat == undefined) ? {width:"100%"} : {width:"310px"}}>
                        {
                            user1chats.map(chat => {
                                return <DialogChat key = {Math.random()} chatId = {chat.id} chatName = {chat.DialogName} logo = "default" />
                            })
                        }
                        {
                            user2chats.map(chat => {
                                return <DialogChat key = {Math.random()} chatId = {chat.id} chatName = {chat.DialogName} logo = "default" />
                            })
                        }
                        {
                            renderNoChats()
                        }
                    </ul>
                    {
                        // @ts-ignore
                        (!isMobile() || (isMobile() && currentChat != undefined)) &&
                        <>
                            <section className={styles.userChat}>
                                <div className={styles.messages}>
                                    <div  className={styles.dialog}>
                                        {
                                            currentChat
                                                ?
                                                messages.map(item => {
                                                    return <Message text={item.message} senderId={1} logo={process.env.NEXT_PUBLIC_apiHost + "api/static/getUserLogo?username=default"} key = {Math.random()}/>
                                                })
                                                :
                                                NoDialog()
                                        }
                                    </div>
                                    <div className={styles.textMessage}>
                                        {
                                            currentChat &&
                                            <>
                                                <svg className={styles.attachment} width="32" height="32" viewBox="0 0 32 32"
                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM0.8 16C0.8 24.3947 7.60527 31.2 16 31.2C24.3947 31.2 31.2 24.3947 31.2 16C31.2 7.60527 24.3947 0.8 16 0.8C7.60527 0.8 0.8 7.60527 0.8 16Z"
                                                        fill="#2E4A63"/>
                                                    <path
                                                        d="M17.6897 23.7014L22.9109 16.7481C23.7593 15.6175 24.1353 14.1875 23.9564 12.7725C23.7774 11.3575 23.058 10.0733 21.9565 9.20233C21.4216 8.74479 20.8003 8.40564 20.1316 8.20615C19.4629 8.00667 18.7612 7.95116 18.0706 8.04311C17.38 8.13506 16.7154 8.37248 16.1185 8.74048C15.5216 9.10848 15.0052 9.5991 14.6019 10.1816L8.70699 17.9907C7.19116 19.8504 8.38618 22.105 9.73358 23.1912C10.4555 23.7921 11.3794 24.0764 12.3044 23.9824C13.2295 23.8884 14.081 23.4237 14.6741 22.6893L20.5369 14.8802C20.7172 14.6404 20.8497 14.3664 20.9267 14.0741C21.0038 13.7817 21.0239 13.4766 20.9859 13.1762C20.9479 12.8759 20.8526 12.5861 20.7053 12.3236C20.5581 12.0611 20.3619 11.8309 20.1278 11.6463C19.655 11.2747 19.0581 11.1103 18.4675 11.189C17.8769 11.2676 17.3406 11.5829 16.9759 12.0659L12.0274 18.649"
                                                        stroke="white"
                                                        strokeMiterlimit="10"/>
                                                </svg>
                                                <input placeholder={"Your Message"} type="text" value={message}
                                                       onChange={event => dispatch(setCurrentMessage(event.target.value))}/>
                                                <svg onClick={e => chatSendMessage()} className={styles.sendMessage} width="32" height="32"
                                                     viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="16" cy="16" r="16" fill="#5182AE"/>
                                                    <path d="M17.6667 25L13.7911 18.2089L7 14.3333L23 9L17.6667 25Z" stroke="white"
                                                          strokeMiterlimit="10" strokeLinejoin="round"/>
                                                </svg>
                                            </>
                                        }

                                    </div>
                                </div>
                                <section className={styles.chatInfo}>
                                    <img src = {
                                        // @ts-ignore
                                        chatInfo.logo
                                    } className = {styles.chatLogo} />
                                    <h2>{
                                        // @ts-ignore
                                        chatInfo.chatName
                                    }</h2>
                                </section>
                            </section>
                        </>
                    }
                </div>
            </main>
        )
    } else {
        return(
            <>
            </>
        )
    }
}