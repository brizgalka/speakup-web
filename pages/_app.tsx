import '../styles/globals.css'
import connect from "../ts/http/wsConnection"
import type { AppProps } from 'next/app'
import {useEffect} from "react";

import { wrapper } from "../ts/redux/store";

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    connect()
  })
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App);