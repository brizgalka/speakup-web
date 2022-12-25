import styles from "./style.module.scss"
import Head from "next/head";

export default function сhangelog() {
    return(
        <div className={styles.changelog}>
            <Head>
                <title>changeLog</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href = "/favicon.png"/>
            </Head>
            <h1>change log</h1>
        </div>
    )
}