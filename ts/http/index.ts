import axios from "axios";

var $host;

if (typeof window !== 'undefined') {

    $host = axios.create({
        baseURL: "http://26.4.83.74:6060/",
        validateStatus: function (status: number) {
            return status < 500;
        },
        withCredentials: true,
    })
}

export {
    $host
}