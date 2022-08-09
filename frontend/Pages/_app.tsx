import Head from 'next/head';
import { AppProps } from 'next/app';
import * as React from 'react';
import wrapper from '../store/configureStore'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>⌨️코테모아</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);