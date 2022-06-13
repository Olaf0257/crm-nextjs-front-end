import { RegisterOptions } from 'react-hook-form'

/* HELPERS */
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/* Enuns */
export enum StatusesOrder {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

/* INTERFACES */
export interface Field extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  type: string
  placeholder: string
  rules: RegisterOptions
  autoComplete: string
}

export interface Client {
  id: string
  phone_number: string
  first_name: string
  last_name: string
  company: string
  email: string
  seller: {
    id: string
    first_name: string
    createdAt: number
  }
}

export interface Product {
  id: string
  name: string
  stock: number
  price: number
  createdAt: Date
  updatedAt: Date
}

export interface ProductWithQuantity extends Product {
  quantity: number
}

export interface User {
  id: string
  first_name: string
  last_name: string
  company: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  status: StatusesOrder
  client: Client
  seller: User
  total: number
  products: {
    product: Product
    quantity: number
  }[]
}

export interface TopSeller {
  seller: User[]
  total: number
  totalOrders: number
  _id: string
}

export interface TopClient {
  client: Client[]
  total: number
  totalOrders: number
  _id: string
}

/* TYPES */
export type GetMyClients = { getMyClients: Client[] }
export type GetProducts = { getProducts: Product[] }
export type GetMyOrders = {
  getMyOrders: Array<Order>
}

export type GetTopSellers = { getTopSellers: TopSeller[] }
export type GetTopClients = { getTopClients: TopClient[] }
