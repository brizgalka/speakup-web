import React from 'react';
import styles from "./notFound.module.scss"
import Link from "next/link";

const Index = () => {
    return (
        <div className = {styles.notFound}>
            <div className={styles.form}>
                <h1>Ops!</h1>
                <h2>Page not Found</h2>
                <div className={styles.dir}>
                    <div className={styles.links}>
                        <Link href={"/"}>To go /</Link>
                        <Link href={"/auth/login"}>To go /auth/login</Link>
                        <Link href={"/auth/register"}>To go /auth/register</Link>
                        <Link href={"/auth/forgot-password"}>To go /auth/forgot-password</Link>
                        <Link href={"/useragree"}>To go /useragree</Link>
                    </div>
                    <img src = {"http://localhost:6060/api/static/getUserLogo?username=default"}/>
                </div>
            </div>
        </div>
    );
};

export default Index;