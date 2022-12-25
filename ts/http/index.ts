import axios from "axios";
import {AxiosInstance} from "axios/index";

var $host: AxiosInstance;

if (typeof window !== 'undefined') {

    $host = axios.create({
        baseURL: process.env.NEXT_PUBLIC_apiHost,
        validateStatus: function (status: number) {
            return status < 500;
        },
        withCredentials: true,
    })
}

export {
    $host
}