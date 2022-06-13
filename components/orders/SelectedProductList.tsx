import * as React from 'react'

/* Context */
import OrderContext from 'context/orders/context'

/* Components */
import { SelectedProductItem } from '.'

/* Main Component */
function SelectedProducts() {
  const { products } = React.useContext(OrderContext).state
  let content: React.ReactNode

  // JSX Elements
  if (products.length > 0) {
    content = products.map((product) => (
      <SelectedProductItem key={product.id} product={product} />
    ))
  } else {
    content = <p>There are no products selected</p>
  }

  return <div>{content}</div>
}

export default SelectedProducts
