import { Client, ProductWithQuantity } from 'types'

/* ACTIONS TYPES */
export enum ActionTypes {
  SELECT_CLIENT = 'SELECT_CLIENT',
  SET_QUANTITY = 'SET_QUANTITY',
  ADD_PRODUCT = 'ADD_PRODUCT',
  UPDATE_TOTAL = 'UPDATE_TOTAL',
  RESET_ORDER_FORM = 'RESET_ORDER_FORM'
}

export interface SelectClient {
  type: typeof ActionTypes.SELECT_CLIENT
  client: Client
}
export interface AddProduct {
  type: typeof ActionTypes.ADD_PRODUCT
  products: ProductWithQuantity[]
}

export interface UpdateTotal {
  type: typeof ActionTypes.UPDATE_TOTAL
}

export interface ResetOrderForm {
  type: typeof ActionTypes.RESET_ORDER_FORM
}

export interface SetQuantity {
  type: typeof ActionTypes.SET_QUANTITY
  productWithQuantity: ProductWithQuantity
}

export type Actions =
  | SelectClient
  | AddProduct
  | SetQuantity
  | UpdateTotal
  | ResetOrderForm

export type Value = {
  state: LocalState
  dispatch: React.Dispatch<Actions>
}

/* LOCAL STATE */
export interface LocalState {
  client: Client
  products: ProductWithQuantity[]
  total: number
}
