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
            <div className={styles.text}>
                <p>{text}</p>
            </div>
        </div>
    );
};