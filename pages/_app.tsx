import '../styles/globals.css'
import connect from "../http/wsConnection"
import type { AppProps } from 'next/app'
import {useEffect} from "react";

import { wrapper } from "../redux/store";

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    connect()
  })
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App);