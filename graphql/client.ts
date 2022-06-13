import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const HttpLink = createHttpLink({
  uri: 'https://gentle-brushlands-90330.herokuapp.com/'
})

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem('TOKEN')

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(HttpLink),
  cache: new InMemoryCache()
})

export default client
