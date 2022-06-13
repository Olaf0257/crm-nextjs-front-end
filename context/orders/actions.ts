import { Client, ProductWithQuantity } from 'types'
import {
  ActionTypes,
  AddProduct,
  SelectClient,
  SetQuantity,
  UpdateTotal,
  ResetOrderForm
} from './types'

/* ACTIONS */
export const selectClient = (client: Client): SelectClient => ({
  type: ActionTypes.SELECT_CLIENT,
  client
})

export const addProduct = (products: ProductWithQuantity[]): AddProduct => ({
  type: ActionTypes.ADD_PRODUCT,
  products
})

export const setQuantity = (
  productWithQuantity: ProductWithQuantity
): SetQuantity => ({
  type: ActionTypes.SET_QUANTITY,
  productWithQuantity
})

export const updateTotal = (): UpdateTotal => ({
  type: ActionTypes.UPDATE_TOTAL
})

export const resetOrderForm = (): ResetOrderForm => ({
  type: ActionTypes.RESET_ORDER_FORM
})
