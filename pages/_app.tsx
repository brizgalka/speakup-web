import '../styles/globals.css'
import WsConnection from "../ts/http/wsConnection"
import type { AppProps } from 'next/app'
import {useEffect} from "react";

import { wrapper } from "../ts/redux/store";
import {getUserData} from "../ts/http/userApi";
import Router from "next/router";
import {useDispatch} from "react-redux";
import {setIsLoggened, setUsername} from "../ts/redux/authSlice";

function App({ Component, pageProps }: AppProps) {

  const dispatch = useDispatch()

  useEffect(() => {

    const fetchData = async () => {
      const result = await getUserData()
      if(result.data == "Unauthorized") {
        if(window.location.pathname == "/") { Router.push("/auth/login") }
      } else {
        dispatch(setIsLoggened(true))
        dispatch(setUsername(result.data.username))
      }
    }

    WsConnection.createConnection()

    fetchData()
        .catch(console.error);
  },[])
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App);