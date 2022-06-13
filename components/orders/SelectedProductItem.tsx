import OrderContext from 'context/orders/context'
import * as React from 'react'

/* Context */
import * as actions from 'context/orders/actions'

/* Types */
import { Product, ProductWithQuantity } from 'types'

/* Utils */
import { formatedPrice } from 'utils'

// Types
interface Props {
  product: Product
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

/* Main Component */
function SelectedProductItem({ product }: Props) {
  const { name, price, stock } = product

  // States
  const [quantity, setQuantity] = React.useState<number>(1)

  // Context
  const { dispatch } = React.useContext(OrderContext)

  // Methods
  const onChangeQuantity = (e: ChangeEvent) => {
    const quantity = Number(e.target.value)
    setQuantity(quantity)
  }

  // Lifecirlce
  React.useEffect(() => {
    const productWithQuantity: ProductWithQuantity = { ...product, quantity }
    dispatch(actions.setQuantity(productWithQuantity))
    dispatch(actions.updateTotal())
  }, [quantity])

  return (
    <div className="mb-2 flex justify-between items-center">
      <div className="w-3/5">
        <p>{name}</p>
        <p>{formatedPrice(price)}</p>
      </div>

      <div className="w-1/5 ml-2">
        <input
          onChange={onChangeQuantity}
          className="outline-none mb-2 btn btn-full bg-transparent"
          type="number"
          min="1"
          max={stock}
          value={quantity}
          placeholder="Quantity"
        />
      </div>
    </div>
  )
}

export default SelectedProductItem
