import { AppProps } from 'next/app';
import * as React from 'react';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;