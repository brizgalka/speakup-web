import axios from "axios";

var $host;

if (typeof window !== 'undefined') {

    $host = axios.create({
        baseURL: "http://localhost:6060/",
        validateStatus: function (status: number) {
            return status < 500;
        },
        withCredentials: true,
    })
}

export {
    $host
}