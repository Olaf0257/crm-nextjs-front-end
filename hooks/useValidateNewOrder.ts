import * as React from 'react'

import { LocalState } from 'context/orders/types'

function useValidateNewOrder(state: LocalState) {
  const [isValid, setIsValid] = React.useState(false)

  const validate = (): boolean => {
    const { products, total, client } = state
    const haveProducts = products.every((p) => p.quantity !== 0)
    if (!haveProducts) return false

    const hasClient = !!client
    if (!hasClient) return false

    const isTotalGreaterThanZero = total > 0
    if (!isTotalGreaterThanZero) return false

    return true
  }

  React.useEffect(() => {
    setIsValid(validate())
  }, [state])

  return { isValid }
}

export default useValidateNewOrder
