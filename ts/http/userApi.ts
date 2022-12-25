import {AxiosInstance} from "axios";

import { $host } from "./index";

export const registration = async (email: string,password: string,password_confirmation: string,username: string) => {
    const bodyFormData = {
        email,
        password,
        username,
        uuid: localStorage.getItem("WsUUID")
    }
    console.log(bodyFormData)
    const response = await $host.post(`api/auth/register`,bodyFormData)
    return response
}

export const login = async (username: string,password: string) => {
    const bodyFormData = {
        username,
        password,
        uuid: localStorage.getItem("WsUUID")
    }
    const response = await $host.post(`api/auth/login`,bodyFormData)
    return response
}

export const forgotPassword = async (username: string) => {
    const bodyFormData = {
        username,
        uuid: localStorage.getItem("WsUUID")
    }
    const response = await $host.post(`api/auth/forgot-password`,bodyFormData)
    return response
}

export const changePassword = async (hashId: string,newPassword: string) => {
    const bodyFormData = {
        hashId,
        newPassword,
        uuid: localStorage.getItem("WsUUID")
    }
    const response = await $host.post(`api/auth/new-password`,bodyFormData)
    return response
}

export const validateHashId = async (hashId: string) => {
    const bodyFormData = {
        hashId,
        uuid: localStorage.getItem("WsUUID")
    }
    const response = await $host.post(`api/auth/validate-hashId`,bodyFormData)
    return response
}

export const check = async () => {
    const response = await $host.get(`api/token/check`)
    return response
}

export const sendMessage = async (chatId: number, message: string) => {
    const bodyFormData = {
        chatId,
        message,
        uuid: localStorage.getItem("WsUUID")
    }
    console.log("BODY")
    console.log(bodyFormData.message)
    const response = await $host.post(`api/user/sendMessage`,bodyFormData)
    return response
}

export const createChat = async (username: string) => {
    const response = await $host.post("api/auth/createChat",{
        username
    });
    return response
}

export const getUserLogo = async (username: string) => {
    const response = await $host.get(`api/static/getUserLogo?username=${username}`)
    return response
}

export const validateVerifyToken = async (verifyToken: string) => {
    const bodyFormData = {
        verifyToken,
        uuid: localStorage.getItem("WsUUID")
    }
    const response = await $host.post(`api/auth/validate-verifyToken`,bodyFormData)
    return response
}

export const getMessages = async (chatId: number) => {
    const bodyFormData = {
        chatId,
        uuid: localStorage.getItem("WsUUID")
    }
    const response = await $host.post(`api/user/getMessages`,bodyFormData)
    return response
}

export const getDialogs = async () => {
    const bodyFormData = {
        uuid: localStorage.getItem("WsUUID")
    }
    const response = await $host.post(`api/user/getDialogs`, bodyFormData);
    return response
}

export const getUserData = async () => {
    const response = await $host.get(`api/user/getUserData`);
    return response
}