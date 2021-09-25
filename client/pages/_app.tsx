import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { UserContext } from '../context/UserContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  const [ user, setUser ] = useState(null);

  return (
    <ChakraProvider>
      <UserContext.Provider value={{user, setUser}} >
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </UserContext.Provider>
    </ChakraProvider>
  )
}
export default MyApp
