import styles from "./userChatList.module.scss"

import React from 'react';

interface userChatInterface {
    username: string;
}

export default function userChatList (props: userChatInterface) {
    return (
        <div className = {styles.userChat}>
            <h1>{props.username}</h1>
        </div>
    );
};