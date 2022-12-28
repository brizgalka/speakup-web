import Head from 'next/head'
import MainPage from "./index/index"

export default function Home() {
    return (
        <div>
            <Head>
                <title>SpeakUp</title>
                <meta name="description" content="Speak-up - Messenger"/>
                <link rel="icon" href = "/favicon.png"/>
            </Head>
            <MainPage/>
        </div>
    )
}