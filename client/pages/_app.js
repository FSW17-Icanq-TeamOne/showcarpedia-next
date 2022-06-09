import "../styles/globals.css";
import SSRProvider from "react-bootstrap/SSRProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { MainProvider } from "../context/mainContext";
import { SocketProvider } from "../context/socketContext";
import Head from 'next/head'
import React, { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [webData, setwebData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3001/v1/about`, {
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => setwebData(data))
      .catch((err) => console.log(err));
  },[])
  return (
    <MainProvider>
      <SocketProvider>
        <Provider store={store}>
          <SSRProvider>
            <Head>
              <title>{webData?.title}</title>
            </Head>
            <Component {...pageProps} />
          </SSRProvider>
        </Provider>
      </SocketProvider>
    </MainProvider>
  );
}

export default MyApp;
