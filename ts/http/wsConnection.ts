export default function connect() {
    let socket: WebSocket;
    let connected = false;

    function changeConnectedStatus(to: boolean) {
        connected = to
    }

    changeConnectedStatus(false)

    if (localStorage["WsUUID"] == undefined) localStorage["WsUUID"] = "no"

    function connect_socket() {
        socket = new WebSocket("ws://localhost:6061", String(localStorage["WsUUID"]));
        socket.onopen = function (e) {
            changeConnectedStatus(true)
        };
        socket.onmessage = function (event) {
            changeConnectedStatus(true)
            const message = JSON.parse(event.data)
            console.log(message)
            if (message["setWsUUID"] != undefined) {
                localStorage["WsUUID"] = message["setWsUUID"]
            }
            if (message["verify"] != undefined) {
                if (message["verify"] == "ok") {
                    console.log("Successful")
                }
            }
        };
        socket.onclose = function (event) {
            changeConnectedStatus(false)
            connect_socket()
        };
        socket.onerror = function (error) {
            changeConnectedStatus(false)
        };
    }

    function heartbeat() {
        if (!socket) return;
        if (socket.readyState !== 1) return;
        changeConnectedStatus(true)
        socket.send(JSON.stringify({
                "message": "heartbeat",
                "uuid": String(localStorage["WsUUID"])
            }
        ));
    }

    const interval = setInterval(heartbeat, 500);
    connect_socket()
};