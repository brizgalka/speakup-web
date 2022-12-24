import {useDispatch} from "react-redux";
import {setRegisterConfirm} from "../redux/authSlice";

export default class WsConnection {
    static socket: WebSocket;
    static connected = false;

    static changeConnectedStatus(to: boolean) { WsConnection.connected = to }

    static onMessage(event: any) {
        WsConnection.changeConnectedStatus(true)
        const message = JSON.parse(event.data)
        console.log(message)
        if(message["setWsUUID"] != undefined) {
            localStorage["WsUUID"] = message["setWsUUID"]
        }
        if(message["verify"] != undefined) {
            if(message["verify"] == "ok") {
                console.log("Successful")
            }
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
        console.log(event)
    }

    static connect_socket() {
        WsConnection.socket = new WebSocket("ws://26.4.83.74:6061", String(localStorage["WsUUID"]));

        WsConnection.socket.addEventListener("open", (event: any) =>  WsConnection.onOpen(event))
        WsConnection.socket.addEventListener("message", (event: any) => WsConnection.onMessage(event))
        WsConnection.socket.addEventListener("close", (event: any) =>WsConnection.onClose(event))
        WsConnection.socket.addEventListener("error",(event: any) => WsConnection.onError(event))
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

        const interval = setInterval(() => WsConnection.heartbeat(), 500);
        WsConnection.connect_socket()
    }


}