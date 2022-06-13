import { AppProps } from 'next/dist/next-server/lib/router/router'
import '../styles/globals.css'
import '../styles/spinner.css'

/* Apollo and GraphQL */
import { ApolloProvider } from '@apollo/client'
import client from 'graphql/client'

/* Context */
import OrderProvider from '../context/orders/state'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <OrderProvider>
        <Component {...pageProps} />
      </OrderProvider>
    </ApolloProvider>
  )
}

export default MyApp
