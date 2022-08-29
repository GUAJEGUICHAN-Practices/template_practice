import Head from 'next/head';
import { AppProps } from 'next/app';
import * as React from 'react';
import wrapper from '../store/configureStore'
import "../styles/global.css";

import { SessionProvider } from "next-auth/react";

import styles from '../styles/index.module.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>⌨️코테모아</title>
      </Head>
      <div className={styles.empty} />
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
      <div className={styles.empty} />

    </>
  );
};

export default wrapper.withRedux(App);