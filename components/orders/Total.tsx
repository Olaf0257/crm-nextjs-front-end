import * as React from 'react'

/* Context */
import OrderContext from 'context/orders/context'

/* Utils */
import { formatedPrice } from 'utils'

function Total() {
  const { total } = React.useContext(OrderContext).state

  return (
    <div className="flex items-center justify-between bg-black-900 px-3 py-2 mt-4">
      <h3 className="uppercase ">Total to pay: </h3>

      <p>{formatedPrice(total)}</p>
    </div>
  )
}

export default Total
