import {useDispatch, useSelector} from "react-redux";
import {selectTOKEN, setRegisterConfirm} from "../redux/authSlice";

export default class WsConnection {
    static socket: WebSocket;
    static connected = false;

    static changeConnectedStatus(to: boolean) { WsConnection.connected = to }

    static onMessage(event: any) {
        WsConnection.changeConnectedStatus(true)
        const message = JSON.parse(event.data)
        console.log(message)
        if(message["message"] != undefined) {

        }
        if(message["setWsUUID"] != undefined) {
            localStorage["WsUUID"] = message["setWsUUID"]
        }
        if(message["notAuth"] != undefined) {
            WsConnection.authConnection("aw")
        }
    }

    static onOpen(event: any) {
        WsConnection.changeConnectedStatus(true)
    }

    static onClose(event: any) {
        WsConnection.changeConnectedStatus(false)
        WsConnection.connect_socket()
    }

    static onError(event: any) {
        WsConnection.changeConnectedStatus(false)
    }

    static authConnection(token: string) {
        if (!WsConnection.socket) return;
        if (WsConnection.socket.readyState !== 1) return
        WsConnection.socket.send(JSON.stringify({
            "message": "authConnection",
            data: {
                token
            }
        }))
    }

    static connect_socket() {
        WsConnection.socket = new WebSocket(process.env.NEXT_PUBLIC_wsHost, String(localStorage["WsUUID"]));

        WsConnection.socket.addEventListener("open", (event: any) =>  WsConnection.onOpen(event))
        WsConnection.socket.addEventListener("message", (event: any) => WsConnection.onMessage(event))
        WsConnection.socket.addEventListener("close", (event: any) =>WsConnection.onClose(event))
        WsConnection.socket.addEventListener("error",(event: any) => WsConnection.onError(event))
    }

    static authbeat() {
        if (!WsConnection.socket) return;
        if (WsConnection.socket.readyState !== 1) return;
        WsConnection.socket.send(JSON.stringify({
                "message": "isAuth",
            }
        ));
    }

    static heartbeat() {
        if (!WsConnection.socket) return;
        if (WsConnection.socket.readyState !== 1) return;
        WsConnection.changeConnectedStatus(true)
        WsConnection.socket.send(JSON.stringify({
                "message": "heartbeat",
                "uuid": String(localStorage["WsUUID"])
            }
        ));
    }

    static createConnection() {
        WsConnection.changeConnectedStatus(false)

        if (localStorage["WsUUID"] == undefined) localStorage["WsUUID"] = "no"

        const interval1 = setInterval(() => WsConnection.heartbeat(), 1500);
        const interval2 = setInterval(() => WsConnection.authbeat(), 1500);
        WsConnection.connect_socket()
    }
}