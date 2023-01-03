import React, {useEffect, useRef, useState} from 'react';
import styles from "./useragree.module.scss"
import {getMessages, getUserAgree} from "../../ts/http/userApi";
import {useRouter} from "next/router";

const UserAgree = () => {

    const [userAgree,setUserAgree] = useState("")

    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
            try {
                 return await getUserAgree()
            } catch (e: any) {
                //pass
            }
        }

        fetchData().then(r => {
            if (r != undefined) {
                const result = r.data
                setUserAgree(result)
            }
        })
    },[])

    function getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }

    const [dataOffsets,setDataOffsets] = useState<number[]>([]);

    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)
    const inputRef3 = useRef(null)
    const inputRef4 = useRef(null)


    function acceptAll() {
        if(inputRef1 && inputRef2 && inputRef3 && inputRef4) {
            // @ts-ignore
            if(inputRef1.current.checked && inputRef2.current.checked && inputRef3.current.checked && inputRef4.current.checked) {
                alert("Успешно!")
                router.push("/auth/login")
            } else {
                alert("Вы не прочитали текст!")
            }
        }
    }

    useEffect(() => {
        if(userAgree) {
            const offset1 = getRandomIntInclusive(0, userAgree.length)
            const offset2 = getRandomIntInclusive(0, userAgree.length)
            const offset3 = getRandomIntInclusive(0, userAgree.length)
            const offset4 = getRandomIntInclusive(0, userAgree.length)

            const offsets = [offset1, offset2, offset3, offset4].sort()
            setDataOffsets(offsets)
        }
    }, [userAgree])

    if(userAgree && dataOffsets) {
        return (
            <div className={styles.useragree}>
                <div className={styles.form}>
                    {userAgree.slice(0, dataOffsets[0])}
                    <input ref = {inputRef1} type={"checkbox"}/>
                    {userAgree.slice(dataOffsets[0], dataOffsets[1])}
                    <input ref = {inputRef2} type={"checkbox"}/>
                    {userAgree.slice(dataOffsets[1], dataOffsets[2])}
                    <input ref = {inputRef3} type={"checkbox"}/>
                    {userAgree.slice(dataOffsets[2], dataOffsets[3])}
                    <input ref = {inputRef4} type={"checkbox"}/>
                    {userAgree.slice(dataOffsets[3], userAgree.length)}
                    <button onClick={() => acceptAll()} >Принять</button>
                </div>
            </div>
        );
    }
};

export default UserAgree;