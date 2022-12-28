import styles from "./dialog.module.scss"
import {useDispatch} from "react-redux";
import {setCurrentChat} from "../../ts/redux/chatSlice";

interface messagePropsInterface {
    chatName: string,
    logo: string,
    chatId: number
}

export default function DialogChat(props: messagePropsInterface) {

    const {chatName, logo, chatId} = props

    const dispatch = useDispatch()

    function openChat() {
        dispatch(setCurrentChat(chatId))
    }

    return(
        <div onClick={() => openChat()} className = {styles.message}>
            <img src = {"http://localhost:6060/api/static/getUserLogo?username=default"}/>
            <p>{chatName}</p>
        </div>
    )
}