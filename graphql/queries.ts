import { gql } from '@apollo/client'

export const DELETE_CLIENT_BY_ID = gql`
  mutation deleteClientById($id: String!) {
    deleteClientById(id: $id) {
      id
      first_name
      email
    }
  }
`

export const GET_USER_LOGGED = gql`
  query getUserLogged {
    getUserLogged {
      first_name
      last_name
      email
    }
  }
`

export const UPDATE_ORDER_BY_ID = gql`
  mutation updateOrderById($input: UpdateOrderFields!, $id: String!) {
    updateOrderById(input: $input, id: $id) {
      status
      id
    }
  }
`

export const DELETE_ORDER_BY_ID = gql`
  mutation deleteOrderById($id: String!) {
    deleteOrderById(id: $id) {
      id
    }
  }
`

export const GET_MY_ORDERS = gql`
  query getMyOrders {
    getMyOrders {
      id
      status
      client {
        first_name
        email
        last_name
        phone_number
      }
      seller {
        first_name
        last_name
      }
      products {
        product {
          name
        }
        quantity
      }
      total
    }
  }
`

export const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    getProducts {
      id
      name
      stock
      price
    }
  }
`

export const GET_MY_CLIENTS = gql`
  query getMyClients {
    getMyClients {
      id
      first_name
      last_name
      company
      email
    }
  }
`
export const DELETE_PRODUCT_BY_ID = gql`
  mutation deleteProductById($id: String!) {
    deleteProductById(id: $id) {
      id
      name
      stock
      price
    }
  }
`
export const CREATE_NEW_CLIENT = gql`
  mutation createNewClient($input: CreateClientFields!) {
    createClient(input: $input) {
      id
      first_name
      company
      email
    }
  }
`

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(password: $password, email: $email) {
      accessToken
    }
  }
`

export const CREATE_NEW_ORDER = gql`
  mutation createOrder($input: CreateOrderFields!) {
    createOrder(input: $input) {
      id
      status
      client {
        first_name
        email
        last_name
        phone_number
      }
      seller {
        first_name
        last_name
      }
      products {
        product {
          name
        }
        quantity
      }
      total
    }
  }
`

export const CREATE_NEW_PRODUCT = gql`
  mutation createNewProduct($name: String!, $price: Float!, $stock: Int!) {
    createProduct(name: $name, stock: $stock, price: $price) {
      name
      stock
      price
      id
    }
  }
`
export const CREATE_NEW_USER = gql`
  mutation createUser($input: createNewUserFields!) {
    createUser(createNewUserFields: $input) {
      first_name
      email
    }
  }
`
export const GET_CLIENT_BY_ID = gql`
  query getClientById($id: String!) {
    getClientById(id: $id) {
      id
      first_name
      last_name
      email
      company
      phone_number
    }
  }
`

export const UPDATE_CLIENT_BY_ID = gql`
  mutation updateClientById($id: String!, $input: UpdateClientFields!) {
    updateClientById(id: $id, input: $input) {
      id
      first_name
      last_name
      company
      email
    }
  }
`
export const GET_PRODUCT_BY_ID = gql`
  query getProductById($id: String!) {
    getProductById(id: $id) {
      id
      name
      stock
      price
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation updateProductById($input: UpdateProductFields!, $id: String!) {
    updateProductById(input: $input, id: $id) {
      id
      name
      price
      stock
    }
  }
`

export const GET_TOP_SELLERS = gql`
  query getTopSellers {
    getTopSellers {
      seller {
        first_name
        email
      }
      total
      totalOrders
    }
  }
`

export const GET_TOP_CLIENTS = gql`
  query getTopClients {
    getTopClients {
      total
      totalOrders
      client {
        first_name
        email
      }
    }
  }
`
