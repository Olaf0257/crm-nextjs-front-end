import * as React from 'react'
import OrderContext from './context'
import OrderReducer from './reducer'
import { LocalState } from './types'

/* Types */
interface Props {
  children: React.ReactChild
}

export const initialState: LocalState = {
  client: null,
  products: [],
  total: 0
}

/* Main Component */
function OrderState({ children }: Props) {
  // Reducer
  const [state, dispatch] = React.useReducer(OrderReducer, initialState)

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  )
}

export default OrderState
