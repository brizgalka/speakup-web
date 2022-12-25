import styles from "./message.module.scss"

import React from 'react';

interface messagePropsInterface {
    logo: string;
    senderId: number;
    text: string;
}

export default function Message (props: messagePropsInterface) {

    const {logo,senderId,text} = props

    return (
        <div className = {styles.message}>
            <img src = {logo}/>
            <p>{text}</p>
        </div>
    );
};